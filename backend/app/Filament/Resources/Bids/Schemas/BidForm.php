<?php

namespace App\Filament\Resources\Bids\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BidForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('lot_id')
                    ->relationship('lot', 'title')
                    ->searchable()
                    ->required(),

                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->nullable(),

                TextInput::make('amount')
                    ->numeric()
                    ->step(0.01)
                    ->required(),

                Select::make('bid_type')
                    ->options([
                        'online' => 'Online',
                        'telephone' => 'Telephone',
                        'absentee' => 'Absentee',
                        'admin' => 'Admin',
                    ])
                    ->required(),

                Select::make('status')
                    ->options([
                        'active' => 'Active',
                        'winning' => 'Winning',
                        'outbid' => 'Outbid',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),

                TextInput::make('ip_address')
                    ->nullable()
                    ->maxLength(45),

                TextInput::make('user_agent')
                    ->label('User Agent')
                    ->nullable()
                    ->maxLength(255),

                DateTimePicker::make('placed_at')
                    ->label('Placed At')
                    ->nullable(),
            ]);
    }
}
