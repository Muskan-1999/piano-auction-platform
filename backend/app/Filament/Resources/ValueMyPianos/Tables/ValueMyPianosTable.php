<?php

namespace App\Filament\Resources\ValueMyPianos\Tables;

use App\Models\ValueMyPiano;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ValueMyPianosTable
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
                    ->label('Piano Type')
                    ->sortable(),

                TextColumn::make('valuation_type')
                    ->label('Valuation Type')
                    ->sortable(),

                TextColumn::make('country')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->formatStateUsing(fn (string $state): string => ValueMyPiano::STATUSES[$state] ?? ucfirst($state))
                    ->colors([
                        'secondary' => ValueMyPiano::STATUS_NEW,
                        'primary'   => ValueMyPiano::STATUS_CONTACTED,
                        'warning'   => ValueMyPiano::STATUS_IN_REVIEW,
                        'success'   => ValueMyPiano::STATUS_COMPLETED,
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
                    ->options(ValueMyPiano::STATUSES),

                SelectFilter::make('piano_type')
                    ->options([
                        'Upright Piano'    => 'Upright Piano',
                        'Grand Piano'      => 'Grand Piano',
                        'Baby Grand Piano' => 'Baby Grand Piano',
                        'Digital Piano'    => 'Digital Piano',
                        'Player Piano'     => 'Player Piano',
                        'Other'            => 'Other',
                    ]),

                SelectFilter::make('valuation_type')
                    ->options([
                        'Auction Valuation'      => 'Auction Valuation',
                        'Insurance Valuation'    => 'Insurance Valuation',
                        'Probate Valuation'      => 'Probate Valuation',
                        'Private Sale Valuation' => 'Private Sale Valuation',
                    ]),
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
