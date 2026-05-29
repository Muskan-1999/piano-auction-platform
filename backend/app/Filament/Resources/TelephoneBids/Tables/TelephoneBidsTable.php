<?php

namespace App\Filament\Resources\TelephoneBids\Tables;

use App\Models\TelephoneBid;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TelephoneBidsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('lot.title')
                    ->label('Lot')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('bidder_name')
                    ->label('Bidder')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('max_bid_amount')
                    ->label('Max Bid Amount')
                    ->money('USD')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->colors([
                        'secondary' => TelephoneBid::STATUS_PENDING,
                        'success' => TelephoneBid::STATUS_APPROVED,
                        'danger' => TelephoneBid::STATUS_REJECTED,
                        'warning' => TelephoneBid::STATUS_CONTACTED,
                        'primary' => TelephoneBid::STATUS_COMPLETED,
                    ])
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        TelephoneBid::STATUS_PENDING => 'Pending',
                        TelephoneBid::STATUS_APPROVED => 'Approved',
                        TelephoneBid::STATUS_REJECTED => 'Rejected',
                        TelephoneBid::STATUS_CONTACTED => 'Contacted',
                        TelephoneBid::STATUS_COMPLETED => 'Completed',
                    ]),

                SelectFilter::make('lot_id')
                    ->label('Lot')
                    ->relationship('lot', 'title'),
            ])
            ->recordActions([
                Action::make('approve')
                    ->label('Approve')
                    ->color('success')
                    ->icon('heroicon-o-check')
                    ->visible(fn (TelephoneBid $record): bool => $record->status === TelephoneBid::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->action(fn (TelephoneBid $record) => $record->update(['status' => TelephoneBid::STATUS_APPROVED, 'approved_by' => auth()->id()])),

                Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->icon('heroicon-o-x-mark')
                    ->visible(fn (TelephoneBid $record): bool => $record->status === TelephoneBid::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->action(fn (TelephoneBid $record) => $record->update(['status' => TelephoneBid::STATUS_REJECTED, 'approved_by' => auth()->id()])),

                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
