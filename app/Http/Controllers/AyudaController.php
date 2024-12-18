<?php

namespace App\Http\Controllers;

use App\Models\Ayuda;
use App\Models\User;
use App\Models\AyudaApplicant;
use App\Models\AyudaApplicantFile;
use App\Models\UserDonation;
use App\Models\Donation;
use App\Models\VolunteerOpportunity;
use App\Models\VolunteerApplication;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AyudaController extends Controller
{
                public function index()
            {
                // Fetch all assistance
                $ayudas = Ayuda::all();

                // Filter open assistance (status: Open)
                $openAyudas = Ayuda::where('status', 'Open')->get();

                // Filter closed assistance (status: Closed or Ended)
                $closedAyudas = Ayuda::whereIn('status', ['Closed', 'Ended'])->get();

                $topDonators = UserDonation::select('user_id', DB::raw('SUM(amount) as total_amount'))
                    ->with('user')
                    ->groupBy('user_id')
                    ->orderByDesc('total_amount')
                    ->limit(5)
                    ->get()
                    ->map(function ($donation) {
                        return [
                            'name' => $donation->user->name,
                            'amount' => $donation->total_amount,
                            'avatar_url' => $donation->user->avatar_url
                        ];
                    });

                return Inertia::render('Ayuda', [
                    'openAyudas' => $openAyudas,  // Pass Open assistance
                    'closedAyudas' => $closedAyudas,  // Pass Closed assistance
                   'topDonators' => $topDonators,
                ]);
            }


            public function show($id)  
    {  
    $ayuda = Ayuda::with([  
        'requirements',  
        'donations',  
        'volunteerOpportunities',  
        'volunteerApplications' => function($query) {  
            $query->where('user_id', auth()->id());  
        },  
        
    ])->findOrFail($id);  
    
    $authUser = Auth::user();  

    $userDonations = UserDonation::where('ayuda_id', $ayuda->id)  
      ->where('user_id', $authUser->id)  
      ->get();  

      $totalRaised = UserDonation::where('ayuda_id', $ayuda->id)  
      ->where('status', 'approved') // Assuming you only want to count approved donations  
      ->sum('amount');  

      $donationGoal = $ayuda->donations->first() ? $ayuda->donations->first()->goal : null;
    
    // Calculate total donations raised from user_donations  
    $totalDonationsRaised = $ayuda->userDonations->sum('amount');  
    
    $userVolunteerApplications = VolunteerApplication::where('ayuda_id', $ayuda->id)  
        ->where('user_id', $authUser->id)  
        ->get();  
    
        $totalRaised = UserDonation::where('ayuda_id', $ayuda->id)  
        ->where('status', 'approved') // Assuming you only want to count approved donations  
        ->sum('amount');  
        
    $ayudaApplicant = AyudaApplicant::where('ayuda_id', $ayuda->id)  
        ->where('user_id', $authUser->id)  
        ->first();  
    
        return Inertia::render('AyudaShow', [
            'ayuda' => array_merge($ayuda->toArray(), [
                'donation' => [
                    'goal' => $donationGoal, // Correct goal calculation
                    'raised' => $totalRaised, // Total amount raised
                ],
                'donation_raised' => $totalDonationsRaised, // Use the calculated total
                'donations' => $ayuda->donations, // Include all donations
                'userDonations' => $userDonations, // Include user donations
            ]),
            'ayudaApplicant' => $ayudaApplicant,
            'assistanceReceived' => $ayudaApplicant ? $ayudaApplicant->assistance_received : false,
            'volunteerOpportunities' => $ayuda->volunteerOpportunities,
            'userApplications' => $ayuda->volunteerApplications,
            'donationType' => $ayuda->donations->first()?->donation_type ?? 'money', // Default to "money"
            'userVolunteerApplications' => $userVolunteerApplications,
            'needsDonations' => $ayuda->needs_donations,
            'needsVolunteer' => $ayuda->needs_volunteers,
        ]);
    }


    public function approveApplicant($applicantId)
    {
        // Find the applicant
        $applicant = AyudaApplicant::find($applicantId);
        if (!$applicant) {
            return redirect()->back()->with('error', 'Applicant not found.');
        }

        // Approve the applicant (changing their status to 'approved')
        $applicant->update(['status' => 'approved']);

        // Increment the current beneficiaries count
        $ayuda = Ayuda::find($applicant->ayuda_id);
        $ayuda->increment('current_beneficiaries');

        return redirect()->back()->with('success', 'Applicant approved successfully.');
    }


    public function join(Request $request, $id)
    {
        $request->validate([
            // Add validation rules if needed
        ]);

        $ayuda = Ayuda::findOrFail($id);
        $user = $request->user();

        if (!$ayuda->users()->where('user_id', $user->id)->exists()) {
            $ayuda->users()->attach($user->id);
        }

        return redirect()->route('ayuda.show', $id);
    }

    public function showParticipants($id)
    {
        $ayuda = Ayuda::with('users')->findOrFail($id);

        return Inertia::render('AyudaParticipants', [
            'ayuda' => $ayuda,
            'participants' => $ayuda->users,
        ]);
    }

    public function apply(Request $request, $id)
    {
        $userId = auth()->id();

        if (!$id || !$userId) {
            return redirect()->back()->with('error', 'Invalid application data.');
        }

        // Fetch the Ayuda and its associated requirements
        $ayuda = Ayuda::with('requirements')->findOrFail($id);

        // Validate that files are uploaded for each requirement
        $validationRules = [];
        foreach ($ayuda->requirements as $requirement) {
            $validationRules["files.{$requirement->id}"] = 'required|file|mimes:jpg,jpeg,png,pdf|max:2048';
        }

        $request->validate($validationRules);

        $user = User::findOrFail($userId);
        $fullName = $user->last_name  . ' ' . $user->first_name. ' ' . $user->middle_name;

        // Create the Ayuda applicant entry
        $applicant = AyudaApplicant::create([
            'user_id' => $userId,
            'ayuda_id' => $id,
            'full_name' => $fullName,  // Store full name
            'status' => 'pending', // Set initial status as pending
            'applied_at' => now(), 
        ]);

        // Update the current beneficiaries count
        $ayuda->increment('current_beneficiaries');

        // Handle file uploads for each requirement
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $requirementId => $file) {
                $path = $file->store('uploads', 'public');

                AyudaApplicantFile::create([
                    'ayuda_applicant_id' => $applicant->id,
                    'requirement_id' => $requirementId,
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Applied successfully. You will be notified if you are approved.');
    }


    public function cancelApplicant($applicantId)
    {
        // Find the applicant
        $applicant = AyudaApplicant::find($applicantId);
        if (!$applicant) {
            return redirect()->back()->with('error', 'Applicant not found.');
        }

        // Check if the applicant was already approved before cancellation
        if ($applicant->status === 'approved') {
            // Decrement the current beneficiaries count
            $ayuda = Ayuda::find($applicant->ayuda_id);
            $ayuda->decrement('current_beneficiaries');
        }

        // Remove the applicant (or change their status to 'canceled')
        $applicant->delete();

        return redirect()->back()->with('success', 'Applicant canceled successfully.');
    }

    public function markAttendance(Request $request, $ayudaId, $userId)
    {
        $ayuda = Ayuda::findOrFail($ayudaId);
        $user = User::find($userId);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }

        // Check if the user is already marked as attended
        $attendance = $ayuda->users()->where('user_id', $user->id)->first();
        if ($attendance && $attendance->pivot->attended) {
            return redirect()->back()->with('warning', 'User has already been marked as attended.');
        }

        // Mark attendance
        $ayuda->users()->updateExistingPivot($user->id, ['attended' => true]);

        // Award points if applicable
        $user->increment('youth_points', $ayuda->youth_points);

        return redirect()->route('ayuda.index')->with('success', 'Attendance marked and points awarded.');
    }

    public function getHistory(AyudaApplicant $applicant)
    {
        $history = $applicant->history()->get();  // Fetching the history for this applicant
    
        return Inertia::render('AyudaHistory', [
            'history' => $history,
        ]);
    }
    public function markAssistanceReceived(Request $request, $id)
    {
        $userId = auth()->id();

        // Find the applicant's entry
        $applicant = AyudaApplicant::where('ayuda_id', $id)
                                    ->where('user_id', $userId)
                                    ->first();

        if ($applicant) {
            // Update the status to assistance received
            $applicant->update(['status' => 'assistance_received']);
            return redirect()->back()->with('success', 'Assistance received successfully.');
        }

        return redirect()->back()->with('error', 'Applicant not found.');
    }
   // DonationController.php
   public function donate(Request $request, Ayuda $ayuda)
   {
       $validated = $request->validate([
           'amount' => 'required|numeric|min:1',
           'reference_number' => 'required|string',
           'receipt' => 'nullable|file|image|max:2048',
       ]);

       try {
           $receiptPath = $request->hasFile('receipt') ? $request->file('receipt')->store('receipts', 'public') : null;

           Donation::create([
               'ayuda_id' => $ayuda->id,
               'user_id' => auth()->id(),
               'amount' => $validated['amount'],
               'reference_number' => $validated['reference_number'],
               'receipt_image' => $receiptPath,
               'status' => 'pending',
           ]);

           return redirect()->back()->with('success', 'Donation submitted successfully! Waiting for approval.');
       } catch (\Exception $e) {
           return redirect()->back()->with('error', 'Failed to submit donation. Please try again.');
       }
   }

   public function volunteer(Request $request, $id)
   {
       $request->validate([
           'volunteer_opportunity_id' => 'required|exists:volunteer_opportunities,id',
           'notes' => 'nullable|string'
       ]);
   
       // Check if user has already applied for this opportunity
       $existingApplication = VolunteerApplication::where([
           'user_id' => auth()->id(),
           'ayuda_id' => $id,
           'volunteer_opportunity_id' => $request->volunteer_opportunity_id
       ])->exists();
   
       if ($existingApplication) {
           return redirect()->back()->with('error', 'You have already applied for this volunteer position.');
       }
   
       $user = auth()->user();
       $fullName = "{$user->first_name} {$user->last_name}";
   
       $application = VolunteerApplication::create([
           'user_id' => auth()->id(),
           'full_name' => $fullName, // Add this line
           'ayuda_id' => $id,
           'volunteer_opportunity_id' => $request->volunteer_opportunity_id,
           'status' => 'pending',
           'notes' => $request->notes
       ]);
   
       return redirect()->back()->with('success', 'Volunteer application submitted successfully!');
   }
   public function updateGcashQr(Request $request, Ayuda $ayuda)
    {
        $request->validate([
            'gcash_qr' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            DB::beginTransaction();

            // Delete old QR code if exists
            if ($ayuda->donation && $ayuda->donation->gcash_qr) {
                Storage::disk('public')->delete($ayuda->donation->gcash_qr);
            }

            // Store new QR code
            $qrPath = $request->file('gcash_qr')->store('gcash-qr', 'public');

            // Update or create donation record
            $ayuda->donation()->updateOrCreate(
                ['ayuda_id' => $ayuda->id],
                ['gcash_qr' => $qrPath]
            );

            DB::commit();

            return redirect()->back()->with('success', 'GCash QR code updated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update GCash QR code. Please try again.');
        }
    }
}
