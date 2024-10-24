<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureProfileIsComplete
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // Check if the user exists and if their profile is not complete
        if ($user && !$user->is_profile_complete) {
            return redirect()->route('profile.form')->with('error', 'Please complete your profile.');
        }

        return $next($request);
    }
}

