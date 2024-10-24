<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;

class ShareNotifications
{
    public function handle($request, Closure $next)
    {
        Inertia::share([
            'notifications' => function () use ($request) {
                return $request->user()
                    ? $request->user()->unreadNotifications->take(5)->map(function ($notification) {
                        return [
                            'id' => $notification->id,
                            'data' => $notification->data,
                            'created_at' => $notification->created_at,
                            'read_at' => $notification->read_at,
                        ];
                    })
                    : [];
            },
            'user' => $request->user(),
        ]);

        return $next($request);
    }
}
