<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OtpController extends Controller
{




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

        return redirect()->intended('dashboard');
    }
}