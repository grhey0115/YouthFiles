<?php

namespace App\Http\Controllers;

use App\Models\PersonalInformation;
use App\Models\EducationalBackground;
use App\Models\AdditionalInformation;
use App\Models\EmergencyContact;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function showForm(Request $request): Response
    {
        return Inertia::render('MultiStepForm', [
            'personalInfo' => $request->user()->personalInformation,
            'educationalBackground' => $request->user()->educationalBackground,
            'additionalInformation' => $request->user()->additionalInformation,
            'emergencyContact' => $request->user()->emergencyContact,
        ]);
    }
    

    
    public function postStep1(Request $request): RedirectResponse
        {
            try {
                // Validate the request
                $validated = $request->validate([
                    'barangay' => 'required|string|max:255',
                    'sitio' => 'nullable|string|max:255',
                    'religion' => 'nullable|string|max:255',
                    'date_of_birth' => 'required|date',
                    'age' => 'required|integer',
                    'civil_status' => 'required|string|max:255',
                    'is_solo_parent' => 'required|boolean',
                    'gender' => 'required|string|max:255',
                    'family_members' => 'nullable|integer',
                    'siblings' => 'nullable|integer',
                    'front_id' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                    'back_id' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                ]);

                // Initialize the data array with validated data
                $personalInfo = $validated;
                
                // Handle front_id file
                if ($request->hasFile('front_id')) {
                    $frontIdFile = $request->file('front_id');
                    if ($frontIdFile->isValid()) {
                        $frontIdPath = $frontIdFile->store('ids', 'public');
                        $personalInfo['front_id'] = $frontIdPath;
                        \Log::info('Front ID stored at: ' . $frontIdPath); // Debugging
                    }
                }

                // Handle back_id file
                if ($request->hasFile('back_id')) {
                    $backIdFile = $request->file('back_id');
                    if ($backIdFile->isValid()) {
                        $backIdPath = $backIdFile->store('ids', 'public');
                        $personalInfo['back_id'] = $backIdPath;
                        \Log::info('Back ID stored at: ' . $backIdPath); // Debugging
                    }
                }

                // Add user_id to the data
                $personalInfo['user_id'] = $request->user()->id;

                // Debug the data before saving
                \Log::info('Personal Info Data:', $personalInfo);

                // Find existing record or create new one
                $personalInformation = PersonalInformation::updateOrCreate(
                    ['user_id' => $request->user()->id],
                    $personalInfo
                );

                // Verify the saved data
                \Log::info('Saved Personal Information:', $personalInformation->toArray());

                return Redirect::route('profile.form')
                    ->with('success', 'Personal information updated successfully.');

            } catch (\Exception $e) {
                \Log::error('Error in postStep1: ' . $e->getMessage());
                \Log::error('Stack trace: ' . $e->getTraceAsString());
                return Redirect::route('profile.form')
                    ->with('error', 'There was an error saving your information: ' . $e->getMessage())
                    ->withInput();
            }
        }
    private function handleFileUpdate($model, $newFile, $fieldName)
    {
        // Delete old file if it exists
        if ($model->$fieldName) {
            Storage::disk('public')->delete($model->$fieldName);
        }
        
        // Store new file
        return $newFile->store('ids', 'public');
    }

    public function postStep2(Request $request): RedirectResponse
    {
        $request->validate([
            'current_status' => 'required|string|max:255',
            'last_year_attended' => 'nullable|string|max:255',
            'year_graduated' => 'nullable|string|max:255',
            'year_level' => 'nullable|string|max:255',
            'course' => 'nullable|string|max:255'
        ]);

        EducationalBackground::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'current_status', 'last_year_attended', 'year_graduated',
                'year_level', 'course'
            ])
        );

        return Redirect::route('profile.form');
    }

    public function postStep3(Request $request): RedirectResponse
    {
        $request->validate([
            'is_currently_working' => 'required|in:0,1',
            'hobbies' => 'nullable|array',
            'is_pwd' => 'required|in:0,1',
            'has_conflict_with_law' => 'required|in:0,1',
            'is_indigenous' => 'required|in:0,1',
            'is_registered_voter' => 'required|in:0,1',
            'attended_assembly' => 'required|in:0,1',
            'why_no_assembly' => 'nullable|string',
            'residency_status' => 'required|in:Permanent,Temporary',
        ]);

        AdditionalInformation::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'is_currently_working', 'hobbies', 'is_pwd',
                'has_conflict_with_law', 'is_indigenous',
                'is_registered_voter', 'attended_assembly',
                'why_no_assembly', 'residency_status'
            ])
        );

        return Redirect::route('profile.form');
    }

    public function postStep4(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        EmergencyContact::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'name', 'relationship', 'contact_number', 'address'
            ])
        );

        $request->user()->update(['profile_completed' => true]);

        return Redirect::route('dashboard');
    }

    public function view(Request $request): Response
{
    $user = $request->user()->load([
        'personalInformation',
        'educationalBackground',
        'additionalInformation',
        'emergencyContact'
    ]);

    return Inertia::render('Profile/View', [
        'user' => $user,
        'personalInformation' => $user->personalInformation,
        'educationalBackground' => $user->educationalBackground,
        'additionalInformation' => $user->additionalInformation,
        'emergencyContact' => $user->emergencyContact,
       // 'mustVerifyEmail' => $user instanceof MustVerifyEmail,
        'status' => session('status'),
    ]);
}

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $this->handleAvatarUpload($request, $request->user());

        $request->user()->update($request->only('first_name', 'last_name', 'email'));

        return back()->with('success', 'Profile updated successfully.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    private function handleAvatarUpload(Request $request, $user)
    {
        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }
    }

    public function updateAvatar(Request $request)
        {
            \Log::info('Received request to update avatar.');

            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            try {
                $user = $request->user();

                // Delete existing avatar if it exists
                if ($user->avatar) {
                    Storage::disk('public')->delete('avatars/' . $user->avatar);
                }

                // Generate unique filename
                $avatarName = $user->id.'_avatar'.time().'.'.$request->avatar->extension();
                
                // Store the new avatar
                $path = $request->avatar->storeAs('avatars', $avatarName, 'public');

                // Update user's avatar
                $user->avatar = $avatarName;
                $user->save();

                // Return full URL of the avatar
                return response()->json([
                    'message' => 'Avatar updated successfully',
                    'avatar' => Storage::url('avatars/' . $avatarName)
                ]);
            } catch (\Exception $e) {
                \Log::error('Avatar upload error: ' . $e->getMessage());

                return response()->json([
                    'error' => 'Failed to upload avatar',
                    'message' => config('app.debug') ? $e->getMessage() : 'An unexpected error occurred'
                ], 500);
            }
        }
}