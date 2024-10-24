<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->unreadNotifications;

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Request $request)
    {
        $notificationIds = $request->input('notificationIds', []);

        auth()->user()->unreadNotifications()
            ->whereIn('id', $notificationIds)
            ->update(['read_at' => now()]);

        // Return a response that triggers Inertia to reload shared data
        return redirect()->back();
    }

}
