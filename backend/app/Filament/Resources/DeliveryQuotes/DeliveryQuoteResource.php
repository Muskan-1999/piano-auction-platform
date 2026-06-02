<?php

namespace App\Filament\Resources\DeliveryQuotes;

use App\Filament\Resources\DeliveryQuotes\Pages\CreateDeliveryQuote;
use App\Filament\Resources\DeliveryQuotes\Pages\EditDeliveryQuote;
use App\Filament\Resources\DeliveryQuotes\Pages\ListDeliveryQuotes;
use App\Filament\Resources\DeliveryQuotes\Schemas\DeliveryQuoteForm;
use App\Filament\Resources\DeliveryQuotes\Tables\DeliveryQuotesTable;
use App\Models\DeliveryQuote;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class DeliveryQuoteResource extends Resource
{
    protected static ?string $model = DeliveryQuote::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-truck';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Requests';

    protected static ?string $navigationLabel = 'Delivery Quotes';

    protected static ?string $recordTitleAttribute = 'full_name';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return DeliveryQuoteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DeliveryQuotesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListDeliveryQuotes::route('/'),
            'create' => CreateDeliveryQuote::route('/create'),
            'edit'   => EditDeliveryQuote::route('/{record}/edit'),
        ];
    }
}
