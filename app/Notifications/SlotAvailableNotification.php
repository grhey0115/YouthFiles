<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class SlotAvailableNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $event;

    /**
     * Create a new notification instance.
     *
     * @param $event - the event for which the slot is available
     */
    public function __construct($event)
    {
        $this->event = $event;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Slot Available for ' . $this->event->name,
            'message' => 'A slot for the event ' . $this->event->name . ' has become available. ',
            'event_id' => $this->event->id,
            'action_url' => route('events.show', $this->event->id), // URL to view the event
            'description' => 'Click here to view the event: ' . route('events.show', $this->event->id), // Event link in the description
            'created_at' => now(),
        ];
    }
}
