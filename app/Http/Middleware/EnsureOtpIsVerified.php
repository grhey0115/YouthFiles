<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOtpIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Check both session and database status
        if (!session()->has('otp_verified') || !$user->otp_verified) {
            // Clear any existing session to be safe
            session()->forget('otp_verified');
            
            // If accessing via API, return JSON response
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'OTP verification required.'
                ], 403);
            }
            
            // Store the intended URL if it's not the OTP verification page itself
            if (!$request->routeIs('otp.*')) {
                session()->put('url.intended', $request->url());
            }
            
            return redirect()->route('otp.verify');
        }

        return $next($request);
    }
}
