<?php

namespace App\Filament\Resources\Auctions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AuctionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->colors([
                    'secondary' => 'draft',
                    'warning' => 'upcoming',
                    'success' => 'live',
                    'danger' => 'ended',
                    ])->sortable(),

                TextColumn::make('auction_type')
                    ->label('Type')
                    ->sortable(),

                TextColumn::make('start_time')
                    ->label('Starts')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('end_time')
                    ->label('Ends')
                    ->dateTime()
                    ->sortable(),

                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),

                IconColumn::make('is_live')
                    ->boolean()
                    ->label('Live'),

                TextColumn::make('creator.name')
                    ->label('Creator')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'upcoming' => 'Upcoming',
                        'live' => 'Live',
                        'ended' => 'Ended',
                    ]),

                SelectFilter::make('auction_type')
                    ->label('Type')
                    ->options([
                        'online' => 'Online',
                        'live' => 'Live',
                        'hybrid' => 'Hybrid',
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
