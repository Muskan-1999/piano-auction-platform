<?php

namespace App\Filament\Resources\AuctionRegistrations\Tables;

use App\Actions\ApproveRegistrationAction;
use App\Actions\RejectRegistrationAction;
use App\Models\AuctionRegistration;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AuctionRegistrationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('auction.title')
                    ->label('Auction')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.name')
                    ->label('Applicant')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable(),

                TextColumn::make('phone')
                    ->label('Phone'),

                TextColumn::make('country')
                    ->label('Country'),

                TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->color(fn (string $state): string => match ($state) {
                        AuctionRegistration::STATUS_APPROVED => 'success',
                        AuctionRegistration::STATUS_REJECTED => 'danger',
                        default => 'warning',
                    })
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        AuctionRegistration::STATUS_PENDING => 'Pending',
                        AuctionRegistration::STATUS_APPROVED => 'Approved',
                        AuctionRegistration::STATUS_REJECTED => 'Rejected',
                    ]),
            ])
            ->recordActions([
                Action::make('approve')
                    ->label('Approve')
                    ->color('success')
                    ->icon('heroicon-o-check-circle')
                    ->visible(fn (AuctionRegistration $record): bool => $record->status === AuctionRegistration::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->modalHeading('Approve Registration')
                    ->modalDescription('The bidder will be notified instantly via real-time update.')
                    ->action(function (AuctionRegistration $record) {
                        app(ApproveRegistrationAction::class)->execute($record, auth()->user());
                    }),

                Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->icon('heroicon-o-x-circle')
                    ->visible(fn (AuctionRegistration $record): bool => $record->status === AuctionRegistration::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->modalHeading('Reject Registration')
                    ->action(function (AuctionRegistration $record) {
                        app(RejectRegistrationAction::class)->execute($record, auth()->user());
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
