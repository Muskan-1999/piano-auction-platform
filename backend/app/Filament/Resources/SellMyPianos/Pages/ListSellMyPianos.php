<?php

namespace App\Filament\Resources\SellMyPianos\Pages;

use App\Filament\Resources\SellMyPianos\SellMyPianoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSellMyPianos extends ListRecords
{
    protected static string $resource = SellMyPianoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
