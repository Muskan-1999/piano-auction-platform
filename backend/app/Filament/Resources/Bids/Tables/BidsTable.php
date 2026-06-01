<?php

namespace App\Filament\Resources\Bids\Tables;

use App\Models\Bid;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class BidsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('lot.title')
                    ->label('Lot')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.name')
                    ->label('Bidder')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('amount')
                    ->sortable(),

                TextColumn::make('bid_type')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->colors([
                        'success' => Bid::STATUS_WINNING,
                        'warning' => Bid::STATUS_ACTIVE,
                        'danger' => Bid::STATUS_OUTBID,
                        'secondary' => Bid::STATUS_CANCELLED,
                    ])
                    ->sortable(),

                TextColumn::make('placed_at')
                    ->label('Placed At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('bid_type')
                    ->options([
                        Bid::TYPE_ONLINE => 'Online',
                        Bid::TYPE_TELEPHONE => 'Telephone',
                        Bid::TYPE_ABSENTEE => 'Absentee',
                        Bid::TYPE_ADMIN => 'Admin',
                    ]),

                SelectFilter::make('status')
                    ->options([
                        Bid::STATUS_ACTIVE => 'Active',
                        Bid::STATUS_WINNING => 'Winning',
                        Bid::STATUS_OUTBID => 'Outbid',
                        Bid::STATUS_CANCELLED => 'Cancelled',
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
