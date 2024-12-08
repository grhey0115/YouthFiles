<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Notifications\OtpNotification;

class OtpController extends Controller
{
    protected function generateAndSendOtp($user)
    {
        try {
            // Generate OTP
            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            
            // Save OTP to device record
            UserDevice::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'user_agent' => request()->header('User-Agent'),
                    'ip_address' => request()->ip(),
                ],
                [
                    'otp' => $otp,
                    'otp_expires_at' => now()->addMinutes(5),
                    'last_otp_sent_at' => now(),
                ]
            );

            // Send OTP notification immediately
            $user->notify(new OtpNotification($otp));
            
            Log::info('OTP sent successfully to user: ' . $user->id . ' at email: ' . $user->email);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send OTP: ' . $e->getMessage());
            throw $e;
        }
    }

    public function resend(Request $request)
    {
        try {
            $user = $request->user();
            
            // Check for rate limiting
            if ($this->isRateLimited($user)) {
                return response()->json([
                    'error' => 'Please wait before requesting another OTP.'
                ], 429);
            }

            $this->generateAndSendOtp($user);

            return response()->json([
                'message' => 'OTP has been sent successfully to your email'
            ]);
        } catch (\Exception $e) {
            Log::error('OTP Resend Error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to send OTP. Please try again.'
            ], 500);
        }
    }

    public function show()
    {
        return inertia('Auth/OtpVerify');  // Show OTP input form
    }

    public function verify(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);

        $user = Auth::user();
        $userAgent = $request->header('User-Agent');
        $ipAddress = $request->ip();

        // Verify OTP and check expiration
        $device = UserDevice::where('user_id', $user->id)
            ->where('user_agent', $userAgent)
            ->where('ip_address', $ipAddress)
            ->where('otp', $request->otp)
            ->where('otp_expires_at', '>', now())
            ->first();

        if (!$device) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP.']);
        }
        
        $user->update(['otp_verified' => true]);
        // Mark the device as recognized by removing the OTP
        $device->update(['otp' => null, 'otp_expires_at' => null]);

        // Allow the user to proceed
        $request->session()->regenerate();

        session(['otp_verified' => true]);
        return redirect()->intended('dashboard');
    }
}