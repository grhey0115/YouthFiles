<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();

        // If email is already verified
        if ($user->hasVerifiedEmail()) {
            // If user has completed profile, go to dashboard
            if ($user->profile_completed) {
                return redirect()->intended(route('dashboard').'?verified=1');
            }
            // If profile not completed, go to profile form
            return redirect()->route('profile.form', ['verified' => 1]);
        }

        // First time verifying email
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // After verification, check profile completion
        if ($user->profile_completed) {
            return redirect()->intended(route('dashboard').'?verified=1');
        }

        // Redirect to profile form if profile not completed
        return redirect()->route('profile.form', ['verified' => 1]);
    }
}
