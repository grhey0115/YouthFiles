<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TanodRequestStatusNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $status;
    protected $remarks;

    /**
     * Create a new notification instance.
     *
     * @param string $status
     * @param string|null $remarks
     */
    public function __construct(string $status, string $remarks = null)
    {
        $this->status = $status;
        $this->remarks = $remarks;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database']; // You can add other channels like 'broadcast' if needed
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Tanod Request Status Update')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Your Tanod request status has been updated to: ' . ucfirst($this->status) . '.')
            ->when($this->remarks, function ($message) {
                return $message->line('Remarks: ' . $this->remarks);
            })
            ->action('View Request', url('/tanod-requests/' . $notifiable->id)) // Adjust the URL as needed
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'status' => $this->status,
            'remarks' => $this->remarks,
        ];
    }
}