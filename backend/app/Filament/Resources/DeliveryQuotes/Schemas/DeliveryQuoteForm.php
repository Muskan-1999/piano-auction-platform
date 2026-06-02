<?php

namespace App\Filament\Resources\DeliveryQuotes\Schemas;

use App\Models\DeliveryQuote;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DeliveryQuoteForm
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
            TextInput::make('piano_make')->nullable()->maxLength(255),
            TextInput::make('piano_model')->nullable()->maxLength(255),
            Select::make('piano_type')
                ->options(['Grand Piano' => 'Grand Piano', 'Upright Piano' => 'Upright Piano'])
                ->required(),
            TextInput::make('estimated_value')->nullable()->maxLength(100),

            // ── Delivery Address ──────────────────────────────────────
            TextInput::make('address_line_1')->required()->maxLength(255),
            TextInput::make('address_line_2')->nullable()->maxLength(255),
            TextInput::make('city')->required()->maxLength(100),
            TextInput::make('postcode')->required()->maxLength(20),

            // ── Access Details ────────────────────────────────────────
            Toggle::make('has_stairs')
                ->label('Has Stairs')
                ->helperText('Does the delivery address have stairs?'),

            TextInput::make('num_stairs')
                ->label('Number of Stairs')
                ->numeric()
                ->nullable()
                ->minValue(1),

            Toggle::make('is_lift')
                ->label('Lift / Elevator Available')
                ->helperText(
                    'Is a lift or elevator accessible at the delivery address? ' .
                    'If stairs are present but a lift is also available, the delivery team ' .
                    'can use the lift — lowering cost and risk compared to a manual stair carry.'
                ),

            Textarea::make('delivery_notes')->nullable(),

            // ── Admin ─────────────────────────────────────────────────
            Select::make('status')
                ->options(DeliveryQuote::STATUSES)
                ->required()
                ->default(DeliveryQuote::STATUS_NEW),
        ]);
    }
}
