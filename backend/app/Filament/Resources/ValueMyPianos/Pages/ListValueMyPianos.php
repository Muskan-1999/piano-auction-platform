<?php

namespace App\Filament\Resources\ValueMyPianos\Pages;

use App\Filament\Resources\ValueMyPianos\ValueMyPianoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListValueMyPianos extends ListRecords
{
    protected static string $resource = ValueMyPianoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
