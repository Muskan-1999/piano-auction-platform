<?php

namespace App\Filament\Resources\TelephoneBids\Pages;

use App\Filament\Resources\TelephoneBids\TelephoneBidResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTelephoneBid extends EditRecord
{
    protected static string $resource = TelephoneBidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
