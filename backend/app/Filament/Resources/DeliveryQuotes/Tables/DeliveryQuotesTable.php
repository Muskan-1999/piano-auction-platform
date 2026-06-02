<?php

namespace App\Filament\Resources\DeliveryQuotes\Tables;

use App\Models\DeliveryQuote;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DeliveryQuotesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

                TextColumn::make('full_name')
                    ->label('Name')
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->searchable(),

                TextColumn::make('piano_make')
                    ->label('Piano Make')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('piano_type')
                    ->label('Type')
                    ->sortable(),

                TextColumn::make('city')
                    ->sortable(),

                TextColumn::make('postcode')
                    ->sortable(),

                IconColumn::make('has_stairs')
                    ->label('Stairs')
                    ->boolean(),

                IconColumn::make('is_lift')
                    ->label('Lift')
                    ->boolean(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => DeliveryQuote::STATUSES[$state] ?? ucfirst($state))
                    ->colors([
                        'secondary' => DeliveryQuote::STATUS_NEW,
                        'primary'   => DeliveryQuote::STATUS_CONTACTED,
                        'warning'   => DeliveryQuote::STATUS_QUOTED,
                        'success'   => DeliveryQuote::STATUS_COMPLETED,
                    ])
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options(DeliveryQuote::STATUSES),

                SelectFilter::make('piano_type')
                    ->options(['Grand Piano' => 'Grand Piano', 'Upright Piano' => 'Upright Piano']),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
