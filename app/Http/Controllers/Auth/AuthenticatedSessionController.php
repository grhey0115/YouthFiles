<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserDevice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use App\Notifications\OTPNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = Auth::user();
        $userAgent = $request->header('User-Agent');
        $ipAddress = $request->ip();

        // Check if this device/browser is already recognized
        $knownDevice = UserDevice::where('user_id', $user->id)
            ->where('user_agent', $userAgent)
            ->where('ip_address', $ipAddress)
            ->first();

        // If this is a new device or browser
        if (!$knownDevice) {
            // Generate OTP for new device
            $otp = mt_rand(100000, 999999);  // Generate a 6-digit OTP

            // Store the device information and OTP
            UserDevice::create([
                'user_id' => $user->id,
                'user_agent' => $userAgent,
                'ip_address' => $ipAddress,
                'otp' => $otp,
                'otp_expires_at' => Carbon::now()->addMinutes(10),  // Set OTP expiry time
            ]);

            // Send OTP to the user's email
            $user->notify(new OTPNotification($otp));

            // Redirect to OTP verification page
            return redirect()->route('otp.verify');
        }

        // If device is already recognized, allow normal login
        $request->session()->regenerate();

        return redirect()->intended('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
