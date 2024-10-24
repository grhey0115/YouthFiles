<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Health\Facades\Health;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
 

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Health::checks([
            OptimizedAppCheck::new(),
            DebugModeCheck::new(),
            EnvironmentCheck::new(),
        ]);

        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
        
                return [
                    'user' => $user ? [
                        'id' => $user->id,
                        'name' => $user->name,
                        'first_name' => $user->first_name,
                        'middle_name' => $user->middle_name,
                        'last_name' => $user->last_name,
                        'avatar_url' => $user->avatar_url,
                        'unread_notifications_count' => $user->unreadNotifications()->count(),
                        'notifications' => $user->unreadNotifications()->limit(5)->get()->map(function ($notification) {
                            return [
                                'id' => $notification->id,
                                'data' => $notification->data,
                                'created_at' => $notification->created_at->toDateTimeString(),
                                'read_at' => $notification->read_at,
                            ];
                        }),
                    ] : null,
                ];
            },
        ]);
    }
}
