<?php

namespace App\Filament\Resources\Lots\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LotsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('auction.title')
                    ->label('Auction')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('lot_number')
                    ->label('Lot #')
                    ->sortable(),

                TextColumn::make('brand')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('starting_bid')
                    ->label('Starting Bid')
                    ->money('USD')
                    ->sortable(),

                TextColumn::make('current_bid')
                    ->label('Current Bid')
                    ->money('USD')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->colors([
                        'secondary' => 'draft',
                        'info' => 'published',
                        'success' => 'live',
                        'warning' => 'sold',
                        'danger' => 'unsold',
                        'gray' => 'withdrawn',
                    ])
                    ->sortable(),

                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),

                TextColumn::make('ends_at')
                    ->label('Ends')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'live' => 'Live',
                        'sold' => 'Sold',
                        'unsold' => 'Unsold',
                        'withdrawn' => 'Withdrawn',
                    ]),

                SelectFilter::make('auction_id')
                    ->label('Auction')
                    ->relationship('auction', 'title'),

                SelectFilter::make('condition')
                    ->options([
                        'excellent' => 'Excellent',
                        'good' => 'Good',
                        'fair' => 'Fair',
                        'poor' => 'Poor',
                        'unknown' => 'Unknown',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
