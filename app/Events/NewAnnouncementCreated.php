<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class NewAnnouncementCreated implements ShouldBroadcast
{
    public $announcement;

    public function __construct($announcement)
    {
        $this->announcement = $announcement;
    }

    public function broadcastOn()
    {
        return new Channel('announcements');  // Broadcasting to the 'announcements' channel
    }

    public function broadcastWith()
    {
        return [
            'title' => $this->announcement->title,
            'message' => $this->announcement->message,
            'created_at' => $this->announcement->created_at->toDateTimeString(),
        ];
    }
}