<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewAnnouncementNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
    protected $announcement;

    /**
     * Create a new notification instance.
     */
    public function __construct($announcement)
    {
        $this->announcement = $announcement;
    }

    // Specify the notification channels (database and broadcast for real-time updates)
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    // Save notification data to the database
    public function toDatabase($notifiable)
    {
        return [
            'announcement_id' => $this->announcement->id,
            'title'           => $this->announcement->title,
            'message'         => $this->announcement->message,
            'created_at'      => $this->announcement->created_at,
        ];
    }

    // Broadcast notification data to WebSockets
    public function toBroadcast($notifiable)
    {
        return [
            'data' => [
                'announcement_id' => $this->announcement->id,
                'title'           => $this->announcement->title,
                'message'         => $this->announcement->message,
                'created_at'      => $this->announcement->created_at,
            ]
        ];
    }

    // Broadcast to a specific channel (e.g., announcements channel)
    public function broadcastOn()
    {
        // Broadcast to a specific user channel or a general 'announcements' channel
        return new Channel('announcements');
    }
}
