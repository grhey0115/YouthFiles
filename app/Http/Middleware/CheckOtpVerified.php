<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckOtpVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            $user = Auth::user();

            // If the user's OTP is not verified, redirect to the OTP verification page
            if (!$user->otp_verified) {
                return redirect()->route('otp.verify')
                    ->with('error', 'Please verify your OTP to access this page.');
            }
        } else {
            // Redirect unauthenticated users to the login page
            return redirect()->route('login')->with('error', 'You must log in first.');
        }

        return $next($request);
    }
}
