<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserApproval
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // If user is pending approval, redirect to pending approval page
        if ($user->approval_status === 'pending') {
            return redirect()->route('pending-approval');
        }

        // If user is rejected, logout and redirect to login
        if ($user->approval_status === 'rejected') {
            Auth::logout();
            return redirect()->route('login')
                ->with('error', 'Your account has been rejected. Please contact support for more information.');
        }

        // Only proceed if user is approved
        if ($user->approval_status === 'approved') {
            return $next($request);
        }

        // Default fallback - redirect to pending approval
        return redirect()->route('pending-approval');
    }
}
