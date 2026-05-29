<?php

namespace App\Filament\Resources\AbsenteeBids\Pages;

use App\Filament\Resources\AbsenteeBids\AbsenteeBidResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAbsenteeBid extends EditRecord
{
    protected static string $resource = AbsenteeBidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
