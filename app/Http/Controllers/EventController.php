<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\EventCancelledNotification;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Auth;
use App\Models\EventRegistration;
use App\Models\Payment;
use Carbon\Carbon;
use App\Models\User; 
use Barryvdh\DomPDF\Facade\Pdf;
use App\Notifications\SlotAvailableNotification;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all()->map(function($event) {
            $event->available_slots = $event->available_slots; // Add the available slots to the event object
            return $event;
        });
    
        return Inertia::render('Dashboard', [
            'events' => $events,
            'auth' => auth()->user(),
        ]);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        $authUser = Auth::user();
    
        $payment = Payment::where('event_id', $event->id)
                          ->where('user_id', $authUser->id)
                          ->first();
    
        // Get attendance status from the pivot table
        $attendanceStatus = $event->users()->where('user_id', $authUser->id)->first()?->pivot->attendance_status;
    
        return Inertia::render('EventShow', [
            'event' => $event,
            'auth' => $authUser,
            'qrCodeSvg' => $event->generateQrCode($authUser),
            'hasJoined' => $event->users->contains($authUser),
            'isFull' => $event->isFull(),
            'paymentStatus' => $payment ? $payment->status : null,
            'cancellation_days_before' => $event->cancellation_days_before,
            'attendance_status' => $attendanceStatus, // Pass the attendance status to the frontend
        ]);
    }

    public function join(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $user = $request->user();
    
        // Check if the event is full
        if ($event->isFull()) {
            return redirect()->back()->with('error', 'Event is full. You cannot register.');
        }
    
        // If the event doesn't have a registration fee, allow the user to join directly
        if ($event->registration_fee == 0 || is_null($event->registration_fee)) {
            // Check if the user has already joined the event
            if (!$event->users()->where('user_id', $user->id)->exists()) {
                $event->users()->attach($user->id);
            }
    
            return redirect()->route('events.show', $id)->with('success', 'You have successfully joined the event.');
        }
    
        // If the event has a registration fee, check if the payment is approved
        $payment = Payment::where('event_id', $event->id)
                        ->where('user_id', $user->id)
                        ->first();
    
        if (!$payment || $payment->status !== 'approved') {
            return redirect()->back()->with('error', 'Your payment has not been approved yet. You cannot join the event.');
        }
    
        // Check if the user has already joined the event
        if (!$event->users()->where('user_id', $user->id)->exists()) {
            $event->users()->attach($user->id);
        }
    
        return redirect()->route('events.show', $id)->with('success', 'You have successfully joined the event.');
    }
    
     /**
     * Show participants of a specific event.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function showParticipants($id)
    {
        // Find the event by ID
        $event = Event::with('users')->findOrFail($id);

        // Return the participants view with the event and its users
        return Inertia::render('EventParticipants', [
            'event' => $event,
            'participants' => $event->users,
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $user = $request->user();

        // Calculate the number of days until the event
        $daysUntilEvent = Carbon::now()->diffInDays($event->start_time);

        // Use admin-specified cancellation cutoff
        $cancellationDaysBefore = $event->cancellation_days_before;

        // Prevent cancellation if the event is within the cancellation cutoff period
        if ($daysUntilEvent < $cancellationDaysBefore) {
            return redirect()->back()->with('error', "You cannot cancel your registration less than {$cancellationDaysBefore} days before the event.");
        }

        // Proceed with the cancellation if allowed
        $event->users()->detach($user->id);  // Detach the user (cancel the registration)

        // Now check if the event has available slots after cancellation
        if ($event->users()->count() < $event->slots) {
            // Notify interested users that a slot is available
            $this->notifyUsersAboutAvailableSlots($event);
        }

        return redirect()->route('events.show', $id)->with('success', 'You have successfully canceled your registration.');
    }

        public function markAttendance(Request $request, $eventId, $userId)
        {
            // Retrieve the event and user
            $event = Event::findOrFail($eventId);
            $user = User::findOrFail($userId);
    
            // Check if the user is already marked as attended
            $attendance = $event->users()->where('user_id', $user->id)->first();
            if ($attendance && $attendance->pivot->attended) {
                return redirect()->back()->with('warning', 'User has already been marked as attended.');
            }
    
            // Mark attendance
            $event->users()->updateExistingPivot($user->id, ['attended' => true]);
    
            // Award youth points
            $user->increment('youth_points', $event->youth_points);
    
            return redirect()->route('dashboard')->with('success', 'Attendance marked and points awarded.');
        }

        public function storePayment(Request $request, $eventId)
    {
        // Validate incoming data
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255',
            'receipt' => 'nullable|file|image|max:2048',
        ]);

        // Find the event and ensure it exists
        $event = Event::findOrFail($eventId);

        // Check if the user already has a payment for this event
        $existingPayment = Payment::where('event_id', $event->id)
                                ->where('user_id', auth()->id())
                                ->first();

        if ($existingPayment) {
            return redirect()->back()->with('error', 'You have already submitted a payment for this event.');
        }

        // Check if the event is full (including pending payments)
        if ($event->isFull()) {
            return redirect()->back()->with('error', 'Event is full. You cannot submit payment.');
        }

        // Store receipt file if uploaded
        $receiptPath = $request->hasFile('receipt') ? $request->file('receipt')->store('receipts') : null;

        // Store the payment in the database
        Payment::create([
            'user_id' => auth()->id(),
            'event_id' => $event->id,
            'reference_number' => $validated['reference_number'],
            'receipt_image' => $receiptPath,
            'amount' => $event->registration_fee,
            'status' => 'pending',
        ]);

        return redirect()->route('events.show', $eventId)->with('success', 'Payment submitted successfully! Waiting for approval.');
    }


        protected function notifyUsersAboutAvailableSlots($event)
    {
        // Find users who are not already registered for the event
        $interestedUsers = User::whereDoesntHave('events', function ($query) use ($event) {
            $query->where('event_id', $event->id);
        })->get();

        // Send notification to each interested user via database
        foreach ($interestedUsers as $user) {
            $user->notify(new SlotAvailableNotification($event));
        }
    }

    public function downloadCertificate($eventId)
    {
        $event = Event::findOrFail($eventId);
        $user = Auth::user();
    
        // Check if the user attended the event
        $attendance = $event->users()->where('user_id', $user->id)->first();
        if (!$attendance || $attendance->pivot->attendance_status !== 'present') {
            return redirect()->back()->with('error', 'You are not eligible to download the certificate.');
        }
    
        // Convert start_time to a Carbon instance
        $event->start_time = Carbon::parse($event->start_time);
    
        $pdf = Pdf::loadView('pdf.certificate', [
            'name' => "{$user->first_name} {$user->last_name}",
            'event' => $event,
        ])->setPaper('a4', 'landscape');
    
        return $pdf->download("Certificate-{$user->first_name}-{$user->last_name}.pdf");
    }

        
}
