<?php

namespace App\Http\Controllers;

use App\Models\BorrowRequests;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Notifications\BorrowRequestStatusNotification;
use Illuminate\Support\Facades\DB;
use App\Events\BorrowRequestStatusChanged;

class BorrowRequestController extends Controller
{
    // List all borrow requests for the current user
    public function index()
    {
        $borrowRequests = BorrowRequests::with('item')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

            return Inertia::render('HelpCenter', [
                'borrowRequests' => $borrowRequests
            ]);
    }

    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'item_id' => 'required|exists:items,id',
            'purpose' => 'required|string|max:500',
            'borrow_date' => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after:borrow_date'
        ]);

        // Use a database transaction for atomic operations
        return DB::transaction(function () use ($validatedData) {
            // Find and lock the item to prevent race conditions
            $item = Item::lockForUpdate()->findOrFail($validatedData['item_id']);
            
            // Check item availability
            if ($item->available_quantity <= 0) {
                throw ValidationException::withMessages([
                    'item_id' => 'This item is currently unavailable.'
                ]);
            }

            // Check for existing active borrow requests for this item and user
            $existingRequest = BorrowRequests::where('user_id', Auth::id())
                ->where('item_id', $validatedData['item_id'])
                ->whereIn('status', ['pending', 'approved'])
                ->exists();

            if ($existingRequest) {
                throw ValidationException::withMessages([
                    'item_id' => 'You already have an active borrow request for this item.'
                ]);
            }

            // Check for date conflicts with existing approved requests
            $dateConflict = BorrowRequests::where('item_id', $validatedData['item_id'])
                ->where('status', 'approved')
                ->where(function ($query) use ($validatedData) {
                    $query->whereBetween('borrow_date', [
                        $validatedData['borrow_date'], 
                        $validatedData['return_date']
                    ])
                    ->orWhereBetween('return_date', [
                        $validatedData['borrow_date'], 
                        $validatedData['return_date']
                    ])
                    ->orWhere(function ($q) use ($validatedData) {
                        $q->where('borrow_date', '<=', $validatedData['borrow_date'])
                        ->where('return_date', '>=', $validatedData['return_date']);
                    });
                })
                ->exists();

            if ($dateConflict) {
                throw ValidationException::withMessages([
                    'borrow_date' => 'This item is already borrowed during the selected dates.'
                ]);
            }

            // Create borrow request
            $borrowRequest = BorrowRequests::create([
                'user_id' => Auth::id(),
                'item_id' => $validatedData['item_id'],
                'purpose' => $validatedData['purpose'],
                'borrow_date' => $validatedData['borrow_date'],
                'return_date' => $validatedData['return_date'],
                'status' => 'pending', // Default status
                'quantity' => 1 // Default quantity
            ]);

            // Optional: Log the borrow request
            activity()
                ->performedOn($item)
                ->causedBy(Auth::user())
                ->log('Borrow request created');

            // Return response
            return redirect()->route('borrow-requests.index')
                ->with('success', 'Borrow request submitted successfully.');
        });
    }

    // Show specific borrow request details
    public function show(BorrowRequests $borrowRequest)
    {
        // Ensure user can only view their own requests
        $this->authorize('view', $borrowRequest);

        return Inertia::render('BorrowRequests/Show', [
            'borrowRequest' => $borrowRequest->load('item', 'user')
        ]);
    }

    // Cancel a pending borrow request
    public function cancel(BorrowRequests $borrowRequest)
    {
        // Use a database transaction
        return DB::transaction(function () use ($borrowRequest) {
            // Ensure user can only cancel their own requests
            $this->authorize('cancel', $borrowRequest);

            // Only allow cancellation of pending requests
            if ($borrowRequest->status !== 'pending') {
                return back()->with('error', 'This request cannot be cancelled.');
            }

            // Update request status
            $borrowRequest->update(['status' => 'cancelled']);

            return redirect()->route('borrow-requests.index')
                ->with('success', 'Borrow request cancelled successfully.');
        });
    }

    // Admin methods
    public function adminIndex()
    {
        $borrowRequests = BorrowRequests::with('item', 'user')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/BorrowRequests', [
            'borrowRequests' => $borrowRequests
        ]);
    }

    // Approve borrow request (for admin)
    public function approve(BorrowRequests $borrowRequest)
    {
        // Use a database transaction
        return DB::transaction(function () use ($borrowRequest) {
            // Ensure only admins can approve
            $this->authorize('approve', $borrowRequest);
    
            // Check if item is still available
            $item = $borrowRequest->item;
            if ($item->available_quantity <= 0) {
                return back()->with('error', 'Item is no longer available.');
            }
    
            // Update item quantity
            $item->decrement('available_quantity');
    
            // Update borrow request status
            $borrowRequest->update([
                'status' => 'approved',
                'approved_at' => now()
            ]);
    
            // Create notification
            $notification = new BorrowRequestStatusNotification($borrowRequest, 'approved');
            
            // Notify the user
            $borrowRequest->user->notify($notification);

            // Broadcast the notification
            broadcast(new BorrowRequestStatusChanged(
                $notification->toArray($borrowRequest->user), 
                $borrowRequest->user->id
            ))->toOthers();
    
            return back()->with('success', 'Borrow request approved.');
        });
    }

    // Reject borrow request (for admin)
    public function reject(BorrowRequests $borrowRequest)
    {
        // Use a database transaction
        return DB::transaction(function () use ($borrowRequest) {
            // Ensure only admins can reject
            $this->authorize('reject', $borrowRequest);

            // Get the rejection reason from the request
            $remarks = request()->input('remarks', 'No specific reason provided');

            // Update borrow request status
            $borrowRequest->update([
                'status' => 'rejected',
                'rejected_at' => now(),
                'admin_remarks' => $remarks
            ]);

            // Create notification
            $notification = new BorrowRequestStatusNotification($borrowRequest, 'rejected');
            
            // Notify the user
            $borrowRequest->user->notify($notification);

            // Broadcast the notification
            broadcast(new BorrowRequestStatusChanged(
                $notification->toArray($borrowRequest->user), 
                $borrowRequest->user->id
            ))->toOthers();

            return back()->with('success', 'Borrow request rejected.');
        });
    }

    // Mark as returned (for admin)
    public function markReturned(BorrowRequests $borrowRequest)
    {
        // Use a database transaction
        return DB::transaction(function () use ($borrowRequest) {
            // Ensure only admins can mark as returned
            $this->authorize('markReturned', $borrowRequest);

            // Ensure request was previously approved
            if ($borrowRequest->status !== 'approved') {
                return back()->with('error', 'Only approved requests can be marked as returned.');
            }

            // Update item quantity
            $item = $borrowRequest->item;
            $item->increment('available_quantity');

            // Update borrow request status
            $borrowRequest->update([
                'status' => 'returned',
                'returned_at' => now()
            ]);

            // Create notification
            $notification = new BorrowRequestStatusNotification($borrowRequest, 'returned');
            
            // Notify the user
            $borrowRequest->user->notify($notification);

            // Broadcast the notification
            broadcast(new BorrowRequestStatusChanged(
                $notification->toArray($borrowRequest->user), 
                $borrowRequest->user->id
            ))->toOthers();

            return back()->with('success', 'Item marked as returned.');
        });
    }
}