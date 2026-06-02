<?php

namespace App\Filament\Resources\ValueMyPianos\Pages;

use App\Filament\Resources\ValueMyPianos\ValueMyPianoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditValueMyPiano extends EditRecord
{
    protected static string $resource = ValueMyPianoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
