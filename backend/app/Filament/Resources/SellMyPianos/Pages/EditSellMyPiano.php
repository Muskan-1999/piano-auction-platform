<?php

namespace App\Filament\Resources\SellMyPianos\Pages;

use App\Filament\Resources\SellMyPianos\SellMyPianoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSellMyPiano extends EditRecord
{
    protected static string $resource = SellMyPianoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
