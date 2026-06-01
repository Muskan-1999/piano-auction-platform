<?php

namespace App\Filament\Resources\SellMyPianos;

use App\Filament\Resources\SellMyPianos\Pages\CreateSellMyPiano;
use App\Filament\Resources\SellMyPianos\Pages\EditSellMyPiano;
use App\Filament\Resources\SellMyPianos\Pages\ListSellMyPianos;
use App\Filament\Resources\SellMyPianos\Schemas\SellMyPianoForm;
use App\Filament\Resources\SellMyPianos\Tables\SellMyPianosTable;
use App\Models\SellMyPiano;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class SellMyPianoResource extends Resource
{
    protected static ?string $model = SellMyPiano::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-musical-note';

    protected static \UnitEnum|string|null $navigationGroup = 'Auction Management';

    protected static ?string $navigationLabel = 'Sell My Piano';

    protected static ?string $recordTitleAttribute = 'full_name';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return SellMyPianoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SellMyPianosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListSellMyPianos::route('/'),
            'create' => CreateSellMyPiano::route('/create'),
            'edit'   => EditSellMyPiano::route('/{record}/edit'),
        ];
    }
}
