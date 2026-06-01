<?php

namespace App\Filament\Resources\TelephoneBids;

use App\Filament\Resources\TelephoneBids\Pages\CreateTelephoneBid;
use App\Filament\Resources\TelephoneBids\Pages\EditTelephoneBid;
use App\Filament\Resources\TelephoneBids\Pages\ListTelephoneBids;
use App\Filament\Resources\TelephoneBids\Schemas\TelephoneBidForm;
use App\Filament\Resources\TelephoneBids\Tables\TelephoneBidsTable;
use App\Models\TelephoneBid;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TelephoneBidResource extends Resource
{
    protected static ?string $model = TelephoneBid::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'guest_name';

    public static function form(Schema $schema): Schema
    {
        return TelephoneBidForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TelephoneBidsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTelephoneBids::route('/'),
            'create' => CreateTelephoneBid::route('/create'),
            'edit' => EditTelephoneBid::route('/{record}/edit'),
        ];
    }
}
