<?php

namespace App\Filament\Resources\DeliveryQuotes\Pages;

use App\Filament\Resources\DeliveryQuotes\DeliveryQuoteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDeliveryQuotes extends ListRecords
{
    protected static string $resource = DeliveryQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
