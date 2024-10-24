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
        public function upload(Request $request)
        {
            // Validate that the files are images or PDFs
            $request->validate([
                'valid_id_paths.*' => 'required|image|mimes:jpeg,png,jpg,pdf|max:2048',
            ]);
        
            $filePaths = [];
            // Check if files are present in the request
            if ($request->hasfile('valid_id_paths')) {
                foreach ($request->file('valid_id_paths') as $file) {
                    // Store the files in the storage/app/public/valid_ids directory
                    $path = $file->store('valid_ids', 'public'); // This saves in storage/app/public/valid_ids
                    $filePaths[] = $path; // Collect the paths
                }
            }
        
            // Save the file paths to the user's personal information in the database
            PersonalInformation::updateOrCreate(
                ['user_id' => $request->user()->id],
                ['valid_id_path' => json_encode($filePaths)] // Save the paths as JSON
            );
        
            return response()->json(['success' => 'Files uploaded successfully.']);
        }
    public function postStep1(Request $request): RedirectResponse
    {
        $request->validate([
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
            'valid_id_path' => 'nullable|string|max:255'
        ]);

        PersonalInformation::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'barangay', 'sitio', 'religion','date_of_birth','age', 'civil_status',
                'is_solo_parent', 'gender', 'family_members',
                'siblings', 'valid_id_path'
            ])
        );

        return Redirect::route('profile.form');
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
        'mustVerifyEmail' => $user instanceof MustVerifyEmail,
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

        if ($request->hasFile('avatar')) {
            \Log::info('Avatar file received.');

            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $avatarName = $request->user()->id.'_avatar'.time().'.'.$request->avatar->extension();
            $request->avatar->storeAs('avatars', $avatarName, 'public');

            $user = $request->user();
            $user->avatar = $avatarName;
            $user->save();

            return response()->json(['success' => 'Avatar updated successfully']);
        } else {
            \Log::warning('No avatar file received.');
            return response()->json(['error' => 'Avatar file is required.'], 422);
        }
    }
}