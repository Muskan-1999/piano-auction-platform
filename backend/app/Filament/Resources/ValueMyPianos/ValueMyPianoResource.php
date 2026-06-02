<?php

namespace App\Filament\Resources\ValueMyPianos;

use App\Filament\Resources\ValueMyPianos\Pages\CreateValueMyPiano;
use App\Filament\Resources\ValueMyPianos\Pages\EditValueMyPiano;
use App\Filament\Resources\ValueMyPianos\Pages\ListValueMyPianos;
use App\Filament\Resources\ValueMyPianos\Schemas\ValueMyPianoForm;
use App\Filament\Resources\ValueMyPianos\Tables\ValueMyPianosTable;
use App\Models\ValueMyPiano;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ValueMyPianoResource extends Resource
{
    protected static ?string $model = ValueMyPiano::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-currency-pound';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Requests';

    protected static ?string $navigationLabel = 'Value My Piano';

    protected static ?string $recordTitleAttribute = 'full_name';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return ValueMyPianoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ValueMyPianosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListValueMyPianos::route('/'),
            'create' => CreateValueMyPiano::route('/create'),
            'edit'   => EditValueMyPiano::route('/{record}/edit'),
        ];
    }
}
