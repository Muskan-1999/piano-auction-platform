<?php

namespace App\Actions;

use App\Events\RegistrationApproved;
use App\Models\AuctionRegistration;
use App\Models\User;

class ApproveRegistrationAction
{
    public function execute(AuctionRegistration $registration, User $approver): AuctionRegistration
    {
        $registration->update([
            'status' => AuctionRegistration::STATUS_APPROVED,
            'approved_by' => $approver->id,
        ]);

        $registration->load(['auction', 'user']);

        RegistrationApproved::dispatch($registration);

        return $registration;
    }
}
