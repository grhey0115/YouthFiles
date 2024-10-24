<?php

// app/Http/Middleware/CheckOtpVerified.php

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
                return redirect()->route('otp.verify');
            }
        }

        return $next($request);
    }
}
