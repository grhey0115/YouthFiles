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
        // If the user's email is already verified, redirect to profile form with a "verified" flag
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('Dashboard').'?verified=1');
        }

        // If this is the first time verifying the email, mark as verified and trigger the event
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // After email verification, redirect to the profile form
        return redirect()->intended(route('profile.form').'?verified=1');
    }
}
