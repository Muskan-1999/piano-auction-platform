<?php

namespace App\Filament\Resources\SellMyPianos\Schemas;

use App\Models\SellMyPiano;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SellMyPianoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            // ── Personal Details ──────────────────────────────────────
            TextInput::make('first_name')->required()->maxLength(255),
            TextInput::make('last_name')->required()->maxLength(255),
            TextInput::make('email')->email()->required()->maxLength(255),
            TextInput::make('phone')->required()->maxLength(30),

            // ── Piano Details ─────────────────────────────────────────
            Select::make('valuation_type')
                ->options([
                    'Auction Valuation'   => 'Auction Valuation',
                    'Insurance Valuation' => 'Insurance Valuation',
                    'Sale Valuation'      => 'Sale Valuation',
                ])
                ->required(),

            Select::make('piano_type')
                ->options([
                    'Upright Piano'    => 'Upright Piano',
                    'Grand Piano'      => 'Grand Piano',
                    'Baby Grand Piano' => 'Baby Grand Piano',
                    'Digital Piano'    => 'Digital Piano',
                ])
                ->required(),

            TextInput::make('piano_make')->required()->maxLength(255),
            TextInput::make('piano_model')->nullable()->maxLength(255),
            TextInput::make('piano_colour')->required()->maxLength(100),
            TextInput::make('serial_number')->nullable()->maxLength(100),
            TextInput::make('dimensions')->nullable()->maxLength(255),
            TextInput::make('age_of_piano')->nullable()->maxLength(100),

            Select::make('ivory_keys')
                ->options(['Yes' => 'Yes', 'No' => 'No', 'Unknown' => 'Unknown'])
                ->required(),

            Select::make('tuned_recently')
                ->options(['Yes' => 'Yes', 'No' => 'No'])
                ->required(),

            Select::make('reconditioned')
                ->options(['Yes' => 'Yes', 'No' => 'No'])
                ->required(),

            Textarea::make('ownership_history')->required(),
            Textarea::make('condition_description')->required(),
            Textarea::make('additional_notes')->nullable(),

            // ── Address ───────────────────────────────────────────────
            TextInput::make('address_line_1')->required()->maxLength(255),
            TextInput::make('address_line_2')->nullable()->maxLength(255),
            TextInput::make('city')->required()->maxLength(100),
            TextInput::make('state')->nullable()->maxLength(100),
            TextInput::make('postcode')->required()->maxLength(20),
            TextInput::make('country')->required()->default('United Kingdom')->maxLength(100),
            Toggle::make('collection_address_different')->label('Collection address different?'),

            Select::make('preferred_contact_method')
                ->options(['Email' => 'Email', 'Phone' => 'Phone'])
                ->required(),

            Select::make('preferred_contact_time')
                ->options(['Morning' => 'Morning', 'Afternoon' => 'Afternoon', 'Evening' => 'Evening'])
                ->nullable(),

            // ── Admin ─────────────────────────────────────────────────
            Select::make('status')
                ->options(SellMyPiano::STATUSES)
                ->required()
                ->default(SellMyPiano::STATUS_PENDING),

            TextInput::make('estimated_value')
                ->numeric()
                ->prefix('£')
                ->nullable(),

            Select::make('assigned_to')
                ->relationship('assignee', 'name')
                ->searchable()
                ->nullable(),

            DateTimePicker::make('contacted_at')->nullable(),

            Textarea::make('admin_notes')->nullable(),
        ]);
    }
}
