<?php

namespace App\Filament\Resources\AbsenteeBids\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AbsenteeBidForm
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

                TextInput::make('guest_name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),

                TextInput::make('phone')
                    ->required()
                    ->maxLength(50),

                TextInput::make('address_1')
                    ->required()
                    ->maxLength(255),

                TextInput::make('address_2')
                    ->nullable()
                    ->maxLength(255),

                TextInput::make('city')
                    ->required()
                    ->maxLength(100),

                TextInput::make('postcode')
                    ->required()
                    ->maxLength(50),

                TextInput::make('country')
                    ->required()
                    ->maxLength(100),

                TextInput::make('max_bid_amount')
                    ->label('Max Bid Amount')
                    ->numeric()
                    ->step(0.01)
                    ->required(),

                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                        'active' => 'Active',
                        'completed' => 'Completed',
                    ])
                    ->required(),

                Textarea::make('notes')
                    ->nullable(),

                Select::make('approved_by')
                    ->relationship('approver', 'name')
                    ->searchable()
                    ->nullable(),
            ]);
    }
}
