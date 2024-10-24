<?php

namespace App\Filament\Resources\AnnouncementsResource\Pages;

use App\Filament\Resources\AnnouncementsResource;
use App\Models\Announcements;
use App\Notifications\NewAnnouncementNotification;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Notification;
use App\Models\User; // Make sure to import the User model

class CreateAnnouncements extends CreateRecord
{
    protected static string $resource = AnnouncementsResource::class;

    protected function afterCreate(): void
    {
        // Get the announcement instance that was just created
        $announcement = $this->record;

        // Log for debugging
        \Log::info('Creating notification for announcement: ', [
            'announcement_id' => $announcement->id,
            'title' => $announcement->title,
        ]);

        // Notify all users about the new announcement
        Notification::send(User::all(), new NewAnnouncementNotification($announcement));
    }
}
