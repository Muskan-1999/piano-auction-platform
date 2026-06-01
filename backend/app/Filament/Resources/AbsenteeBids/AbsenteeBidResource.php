<?php

namespace App\Filament\Resources\AbsenteeBids;

use App\Filament\Resources\AbsenteeBids\Pages\CreateAbsenteeBid;
use App\Filament\Resources\AbsenteeBids\Pages\EditAbsenteeBid;
use App\Filament\Resources\AbsenteeBids\Pages\ListAbsenteeBids;
use App\Filament\Resources\AbsenteeBids\Schemas\AbsenteeBidForm;
use App\Filament\Resources\AbsenteeBids\Tables\AbsenteeBidsTable;
use App\Models\AbsenteeBid;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AbsenteeBidResource extends Resource
{
    protected static ?string $model = AbsenteeBid::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'guest_name';

    public static function form(Schema $schema): Schema
    {
        return AbsenteeBidForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AbsenteeBidsTable::configure($table);
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
            'index' => ListAbsenteeBids::route('/'),
            'create' => CreateAbsenteeBid::route('/create'),
            'edit' => EditAbsenteeBid::route('/{record}/edit'),
        ];
    }
}
