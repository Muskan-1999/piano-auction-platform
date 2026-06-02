<?php

namespace App\Filament\Resources\ValueMyPianos\Schemas;

use App\Models\ValueMyPiano;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ValueMyPianoForm
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
                    'Auction Valuation'      => 'Auction Valuation',
                    'Insurance Valuation'    => 'Insurance Valuation',
                    'Probate Valuation'      => 'Probate Valuation',
                    'Private Sale Valuation' => 'Private Sale Valuation',
                ])
                ->required(),

            Select::make('piano_type')
                ->options([
                    'Upright Piano'    => 'Upright Piano',
                    'Grand Piano'      => 'Grand Piano',
                    'Baby Grand Piano' => 'Baby Grand Piano',
                    'Digital Piano'    => 'Digital Piano',
                    'Player Piano'     => 'Player Piano',
                    'Other'            => 'Other',
                ])
                ->required(),

            TextInput::make('piano_make')->required()->maxLength(255),
            TextInput::make('piano_model')->nullable()->maxLength(255),
            TextInput::make('piano_colour')->nullable()->maxLength(100),
            TextInput::make('serial_number')->nullable()->maxLength(100),
            TextInput::make('dimensions')->nullable()->maxLength(255),

            Select::make('ivory_keys')
                ->options(['Yes' => 'Yes', 'No' => 'No', 'Unknown' => 'Unknown'])
                ->nullable(),

            Select::make('tuned')
                ->options(['Yes' => 'Yes', 'No' => 'No'])
                ->nullable(),

            Select::make('reconditioned')
                ->options(['Yes' => 'Yes', 'No' => 'No'])
                ->nullable(),

            Textarea::make('ownership_history')->nullable(),

            // ── Address ───────────────────────────────────────────────
            TextInput::make('address_line_1')->required()->maxLength(255),
            TextInput::make('address_line_2')->nullable()->maxLength(255),
            TextInput::make('postcode')->required()->maxLength(20),
            TextInput::make('country')->required()->default('United Kingdom')->maxLength(100),

            // ── Admin ─────────────────────────────────────────────────
            Select::make('status')
                ->options(ValueMyPiano::STATUSES)
                ->required()
                ->default(ValueMyPiano::STATUS_NEW),

            Textarea::make('notes')->nullable(),
        ]);
    }
}
