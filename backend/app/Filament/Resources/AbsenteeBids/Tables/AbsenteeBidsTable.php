<?php

namespace App\Filament\Resources\AbsenteeBids\Tables;

use App\Models\AbsenteeBid;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AbsenteeBidsTable
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
                        'secondary' => AbsenteeBid::STATUS_PENDING,
                        'success' => AbsenteeBid::STATUS_APPROVED,
                        'danger' => AbsenteeBid::STATUS_REJECTED,
                        'warning' => AbsenteeBid::STATUS_ACTIVE,
                        'primary' => AbsenteeBid::STATUS_COMPLETED,
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
                        AbsenteeBid::STATUS_PENDING => 'Pending',
                        AbsenteeBid::STATUS_APPROVED => 'Approved',
                        AbsenteeBid::STATUS_REJECTED => 'Rejected',
                        AbsenteeBid::STATUS_ACTIVE => 'Active',
                        AbsenteeBid::STATUS_COMPLETED => 'Completed',
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
                    ->visible(fn (AbsenteeBid $record): bool => $record->status === AbsenteeBid::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->action(fn (AbsenteeBid $record) => $record->update(['status' => AbsenteeBid::STATUS_APPROVED, 'approved_by' => auth()->id()])),

                Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->icon('heroicon-o-x-mark')
                    ->visible(fn (AbsenteeBid $record): bool => $record->status === AbsenteeBid::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->action(fn (AbsenteeBid $record) => $record->update(['status' => AbsenteeBid::STATUS_REJECTED, 'approved_by' => auth()->id()])),

                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
