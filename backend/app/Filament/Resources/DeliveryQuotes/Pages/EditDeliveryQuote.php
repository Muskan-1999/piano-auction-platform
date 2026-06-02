<?php

namespace App\Filament\Resources\DeliveryQuotes\Pages;

use App\Filament\Resources\DeliveryQuotes\DeliveryQuoteResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDeliveryQuote extends EditRecord
{
    protected static string $resource = DeliveryQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
