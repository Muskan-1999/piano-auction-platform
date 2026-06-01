<?php

namespace App\Filament\Resources\TelephoneBids\Pages;

use App\Filament\Resources\TelephoneBids\TelephoneBidResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTelephoneBids extends ListRecords
{
    protected static string $resource = TelephoneBidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
