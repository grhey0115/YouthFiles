<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationStatusNotification extends Notification
{
    use Queueable;

    private string $status;
    private ?string $reason;

    // Pass status and reason (null if approved)
    public function __construct(string $status, ?string $reason = null)
    {
        $this->status = $status;
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        // Specify how you want to notify (database, mail, etc.)
        return ['database', 'mail'];
    }

    public function toMail($notifiable)
    {
        $mailMessage = (new MailMessage)
            ->subject('Application Status Update')
            ->line("Your application status has been updated to: {$this->status}");

        if ($this->status === 'disapproved') {
            $mailMessage->line("Reason for disapproval: {$this->reason}");
        } else {
            $mailMessage->line('Congratulations, your application has been approved!');
        }

        return $mailMessage
            ->action('View Application', url('/ayudas'))
            ->line('Thank you for applying!');
    }

    public function toArray($notifiable)
    {
        return [
            'title' => "Assistance Application Update",
            'message' => $this->status === 'disapproved' 
                ? "Your application has been disapproved. Reason: {$this->reason}" 
                : "Congratulations! Your application has been approved.",
        ];
    }
}