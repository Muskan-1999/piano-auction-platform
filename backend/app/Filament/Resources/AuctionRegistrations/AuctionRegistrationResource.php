<?php

namespace App\Filament\Resources\AuctionRegistrations;

use App\Filament\Resources\AuctionRegistrations\Pages\CreateAuctionRegistration;
use App\Filament\Resources\AuctionRegistrations\Pages\EditAuctionRegistration;
use App\Filament\Resources\AuctionRegistrations\Pages\ListAuctionRegistrations;
use App\Filament\Resources\AuctionRegistrations\Schemas\AuctionRegistrationForm;
use App\Filament\Resources\AuctionRegistrations\Tables\AuctionRegistrationsTable;
use App\Models\AuctionRegistration;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class AuctionRegistrationResource extends Resource
{
    protected static ?string $model = AuctionRegistration::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationLabel = 'Bidder Registrations';

    public static function form(Schema $schema): Schema
    {
        return AuctionRegistrationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AuctionRegistrationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAuctionRegistrations::route('/'),
            'create' => CreateAuctionRegistration::route('/create'),
            'edit' => EditAuctionRegistration::route('/{record}/edit'),
        ];
    }
}
