<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OTPNotification extends Notification
{
    use Queueable;

    protected $otp;  // Declare OTP property

    /**
     * Create a new notification instance.
     *
     * @param string $otp
     */
    public function __construct($otp)
    {
        $this->otp = $otp;  // Assign the passed OTP to the class property
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                ->subject('Your One-Time Password (OTP)')
                ->line('Your One-Time Password (OTP) is: ' . $this->otp)
                ->line('This OTP will expire in 10 minutes.');
    }
}
