<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BorrowRequestStatusNotification extends Notification
{
    use Queueable;

    private string $status;
    private ?string $remarks;

    // Pass status and remarks (null if approved)
    public function __construct(string $status, ?string $remarks = null)
    {
        $this->status = $status;
        $this->remarks = $remarks;
    }

    public function via($notifiable)
    {
        // Specify how you want to notify (database, mail, etc.)
        return ['database', 'mail'];
    }

    public function toMail($notifiable)
    {
        $mailMessage = (new MailMessage)
            ->subject('Borrow Request Status Update')
            ->line("Your borrow request status has been updated to: {$this->status}");

        if ($this->status === 'rejected') {
            $mailMessage->line("Reason for rejection: {$this->remarks}");
        } elseif ($this->status === 'returned') {
            $mailMessage->line('Your item has been marked as returned.');
        } else {
            $mailMessage->line('Congratulations, your borrow request has been approved!');
        }

        return $mailMessage
            ->action('View Borrow Request', url('/borrow-requests'))
            ->line('Thank you for using our service!');
    }

    public function toArray($notifiable)
    {
        return [
            'title' => "Borrow Request Update",
            'message' => $this->status === 'rejected' 
                ? "Your borrow request has been rejected. Reason: {$this->remarks}" 
                : "Your borrow request has been {$this->status}.",
        ];
    }
}