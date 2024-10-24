<?php

namespace App\Http\Controllers;

use App\Models\Announcements;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Notifications\NewAnnouncementNotification;

class AnnouncementController extends Controller
{
    public function store(Request $request)
    {
        $announcement = Announcements::create($request->all());

        // Notify users (adjust to your needs)
        foreach (User::all() as $user) {
            $user->notify(new NewAnnouncementNotification($announcement));
        }

        return redirect()->route('announcements.index');
    }
    // Display a listing of the announcements
    public function index()
        {
            $notifications = auth()->user()->notifications()->latest()->get();

            return Inertia::render('Notifications/Index', [
                'notifications' => $notifications,
            ]);
        }

    // Display the specified announcement
    public function show($id)
    {
        $announcement = Announcements::findOrFail($id);

        return Inertia::render('Announcements/Show', [
            'announcement' => $announcement,
        ]);
    }
}
