<?php

namespace App\Filament\Resources\Lots\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class LotForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('auction_id')
                    ->relationship('auction', 'title')
                    ->required(),

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

                TextInput::make('lot_number')
                    ->required()
                    ->numeric(),

                RichEditor::make('description')
                    ->nullable(),

                TextInput::make('brand')
                    ->nullable()
                    ->maxLength(255),

                TextInput::make('model')
                    ->nullable()
                    ->maxLength(255),

                TextInput::make('serial_number')
                    ->nullable()
                    ->maxLength(255),

                TextInput::make('year')
                    ->nullable()
                    ->numeric(),

                Select::make('condition')
                    ->options([
                        'excellent' => 'Excellent',
                        'good' => 'Good',
                        'fair' => 'Fair',
                        'poor' => 'Poor',
                        'unknown' => 'Unknown',
                    ])
                    ->nullable(),

                Select::make('piano_type')
                    ->label('Piano Type')
                    ->options([
                        'grand'   => 'Grand Piano',
                        'upright' => 'Upright Piano',
                    ])
                    ->nullable(),

                TextInput::make('starting_bid')
                    ->required()
                    ->numeric()
                    ->step(0.01),

                TextInput::make('reserve_price')
                    ->nullable()
                    ->numeric()
                    ->step(0.01),

                TextInput::make('bid_increment')
                    ->nullable()
                    ->numeric()
                    ->step(0.01)
                    ->default(50.00),

                FileUpload::make('featured_image')
                    ->image()
                    ->disk('public')
                    ->directory('lots')
                    ->nullable(),

                FileUpload::make('gallery')
                    ->image()
                    ->disk('public')
                    ->directory('lots/gallery')
                    ->multiple()
                    ->nullable(),

                DateTimePicker::make('ends_at')
                    ->nullable(),

                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'live' => 'Live',
                        'sold' => 'Sold',
                        'unsold' => 'Unsold',
                        'withdrawn' => 'Withdrawn',
                    ])
                    ->required(),

                Toggle::make('is_active'),
            ]);
    }
}
