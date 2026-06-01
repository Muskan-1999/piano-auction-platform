<?php

namespace App\Actions;

use App\Events\RegistrationRejected;
use App\Models\AuctionRegistration;
use App\Models\User;

class RejectRegistrationAction
{
    public function execute(AuctionRegistration $registration, User $rejector): AuctionRegistration
    {
        $registration->update([
            'status' => AuctionRegistration::STATUS_REJECTED,
            'approved_by' => $rejector->id,
        ]);

        $registration->load(['auction', 'user']);

        RegistrationRejected::dispatch($registration);

        return $registration;
    }
}
