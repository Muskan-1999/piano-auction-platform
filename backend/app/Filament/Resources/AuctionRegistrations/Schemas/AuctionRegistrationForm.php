<?php

namespace App\Filament\Resources\AuctionRegistrations\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AuctionRegistrationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('auction_id')
                    ->relationship('auction', 'title')
                    ->required(),

                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),

                TextInput::make('first_name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('last_name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('phone')
                    ->required()
                    ->maxLength(50),

                TextInput::make('country')
                    ->required()
                    ->maxLength(100),

                Textarea::make('address')
                    ->required()
                    ->maxLength(500),

                FileUpload::make('government_id_path')
                    ->disk('public')
                    ->directory('registration_docs')
                    ->required(),

                FileUpload::make('proof_of_address_path')
                    ->disk('public')
                    ->directory('registration_docs')
                    ->required(),

                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->required(),

                Select::make('approved_by')
                    ->relationship('approver', 'name')
                    ->nullable(),
            ]);
    }
}
