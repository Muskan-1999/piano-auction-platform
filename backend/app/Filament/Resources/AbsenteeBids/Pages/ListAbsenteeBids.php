<?php

namespace App\Filament\Resources\AbsenteeBids\Pages;

use App\Filament\Resources\AbsenteeBids\AbsenteeBidResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAbsenteeBids extends ListRecords
{
    protected static string $resource = AbsenteeBidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
