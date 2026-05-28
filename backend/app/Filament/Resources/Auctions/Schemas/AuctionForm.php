<?php

namespace App\Filament\Resources\Auctions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class AuctionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->reactive()
                    ->afterStateUpdated(function (?string $state, callable $set): void {
                        if ($state !== null) {
                            $set('slug', Str::slug($state));
                        }
                    }),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255),

                RichEditor::make('description')
                    ->nullable(),

                FileUpload::make('banner_image')
                    ->image()
                    ->disk('public')
                    ->directory('auctions')
                    ->nullable(),

                Select::make('auction_type')
                    ->options([
                        'online' => 'Online',
                        'live' => 'Live',
                        'hybrid' => 'Hybrid',
                    ])
                    ->required(),

                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'upcoming' => 'Upcoming',
                        'live' => 'Live',
                        'ended' => 'Ended',
                    ])
                    ->required(),

                DateTimePicker::make('preview_start_time')
                    ->nullable(),

                DateTimePicker::make('start_time')
                    ->required(),

                DateTimePicker::make('end_time')
                    ->required(),

                TextInput::make('location')
                    ->nullable()
                    ->maxLength(255),

                Toggle::make('is_featured'),

                Toggle::make('is_live'),

                Select::make('created_by')
                    ->relationship('creator', 'name')
                    ->required(),
            ]);
    }
}
