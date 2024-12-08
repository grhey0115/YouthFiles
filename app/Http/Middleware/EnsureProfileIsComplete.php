<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileIsComplete
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
        $user = $request->user();

        // Skip check for profile form routes and logout
        if ($request->routeIs('profile.form') || 
            $request->routeIs('logout') || 
            $request->routeIs('verification.*')) {
            return $next($request);
        }

        // If profile is not completed (0), redirect to profile form
        if ($user && !$user->profile_completed) {
            return redirect()->route('profile.form');
        }

        return $next($request);
    }
}

