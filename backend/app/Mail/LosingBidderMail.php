<?php

namespace App\Mail;

use App\Models\Lot;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LosingBidderMail extends Mailable
{
    use Queueable, SerializesModels;

    public Lot  $lot;
    public User $recipient;

    public function __construct(Lot $lot, User $recipient)
    {
        $this->lot       = $lot->loadMissing(['auction']);
        $this->recipient = $recipient;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Auction Has Ended — ' . $this->lot->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.losing-bidder',
        );
    }
}
