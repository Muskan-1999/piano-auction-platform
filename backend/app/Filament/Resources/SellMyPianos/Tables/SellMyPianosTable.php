<?php

namespace App\Filament\Resources\SellMyPianos\Tables;

use App\Models\SellMyPiano;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SellMyPianosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),

                TextColumn::make('full_name')
                    ->label('Customer Name')
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
                    ->label('Piano Type')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => SellMyPiano::STATUSES[$state] ?? ucfirst($state))
                    ->colors([
                        'secondary' => SellMyPiano::STATUS_PENDING,
                        'warning'   => SellMyPiano::STATUS_UNDER_REVIEW,
                        'primary'   => SellMyPiano::STATUS_CONTACTED,
                        'info'      => SellMyPiano::STATUS_VALUATION_SENT,
                        'success'   => fn ($state) => in_array($state, [
                            SellMyPiano::STATUS_ACCEPTED,
                            SellMyPiano::STATUS_SCHEDULED,
                            SellMyPiano::STATUS_SOLD,
                        ]),
                        'danger'    => SellMyPiano::STATUS_REJECTED,
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
                    ->options(SellMyPiano::STATUSES),
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
