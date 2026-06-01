<?php

namespace App\Mail;

use App\Models\Lot;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WinnerNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Lot $lot;

    public function __construct(Lot $lot)
    {
        $this->lot = $lot->loadMissing(['auction', 'winner']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Congratulations! You Won the Auction — ' . $this->lot->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.winner-notification',
        );
    }
}
