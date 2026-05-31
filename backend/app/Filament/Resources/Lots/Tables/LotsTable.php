<?php

namespace App\Filament\Resources\Lots\Tables;

use App\Models\Lot;
use App\Services\LotSaleService;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Notifications\Notification;

class LotsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('lot_number')
                    ->label('Lot #')
                    ->sortable(),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('auction.title')
                    ->label('Auction')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('brand')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('current_bid')
                    ->label('Current Bid')
                    ->formatStateUsing(fn ($state) => $state ? '£' . number_format($state, 0) : '—')
                    ->sortable(),

                TextColumn::make('winning_bid_amount')
                    ->label('Sold For')
                    ->formatStateUsing(fn ($state) => $state ? '£' . number_format($state, 0) : '—')
                    ->sortable(),

                TextColumn::make('winner.name')
                    ->label('Winner')
                    ->default('—')
                    ->searchable(),

                TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->color(fn (string $state): string => match ($state) {
                        'live'      => 'success',
                        'sold'      => 'warning',
                        'published' => 'info',
                        'unsold'    => 'danger',
                        'withdrawn' => 'gray',
                        default     => 'secondary',
                    })
                    ->sortable(),

                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
            ])
            ->defaultSort('lot_number')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft'     => 'Draft',
                        'published' => 'Published',
                        'live'      => 'Live',
                        'sold'      => 'Sold',
                        'unsold'    => 'Unsold',
                        'withdrawn' => 'Withdrawn',
                    ]),

                SelectFilter::make('auction_id')
                    ->label('Auction')
                    ->relationship('auction', 'title'),
            ])
            ->recordActions([
                // Mark as Sold — only visible for live lots
                Action::make('mark_sold')
                    ->label('Mark as Sold')
                    ->icon('heroicon-o-check-badge')
                    ->color('warning')
                    ->visible(fn (Lot $record): bool => $record->status === Lot::STATUS_LIVE)
                    ->requiresConfirmation()
                    ->modalHeading('Mark Lot as Sold')
                    ->modalDescription(fn (Lot $record): string =>
                        "Mark Lot {$record->lot_number} \"{$record->title}\" as SOLD? "
                        . "The highest bidder will be recorded as the winner and a notification email will be sent."
                    )
                    ->modalSubmitActionLabel('Mark as Sold')
                    ->action(function (Lot $record) {
                        app(LotSaleService::class)->markAsSold($record);

                        Notification::make()
                            ->title('Lot marked as sold')
                            ->body("Lot {$record->lot_number} has been sold. Winner email dispatched.")
                            ->success()
                            ->send();
                    }),

                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
