<?php

namespace App\Filament\Resources\Auctions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class AuctionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->schema([
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
                            ->nullable()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Media')
                    ->schema([
                        FileUpload::make('banner_image')
                            ->label('Banner Image')
                            ->image()
                            ->disk('public')
                            ->directory('auctions')
                            ->nullable()
                            ->columnSpan(1),

                        FileUpload::make('catalogue_pdf')
                            ->label('Auction Catalogue PDF')
                            ->disk('public')
                            ->directory('catalogues')
                            ->acceptedFileTypes(['application/pdf'])
                            ->nullable()
                            ->columnSpan(1),
                    ])
                    ->columns(2),

                Section::make('Auction Details')
                    ->schema([
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

                        TextInput::make('location')
                            ->nullable()
                            ->maxLength(255),

                        Select::make('created_by')
                            ->relationship('creator', 'name')
                            ->required(),
                    ])
                    ->columns(2),

                Section::make('Schedule')
                    ->schema([
                        DateTimePicker::make('preview_start_time')
                            ->nullable(),

                        DateTimePicker::make('start_time')
                            ->required(),

                        DateTimePicker::make('end_time')
                            ->required(),
                    ])
                    ->columns(3),

                Section::make('Visibility')
                    ->schema([
                        Toggle::make('is_featured')
                            ->label('Featured Auction'),

                        Toggle::make('is_live')
                            ->label('Live Now'),
                    ])
                    ->columns(2),
            ]);
    }
}