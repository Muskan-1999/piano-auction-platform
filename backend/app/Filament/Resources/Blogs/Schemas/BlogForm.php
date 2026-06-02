<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->reactive()
                    ->afterStateUpdated(function (?string $state, callable $set): void {
                        if ($state !== null) {
                            $set('slug', Str::slug($state));
                        }
                    }),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),

                Select::make('category')
                    ->options([
                        'auction-tips'  => 'Auction Tips',
                        'piano-guides'  => 'Piano Guides',
                        'piano-brands'  => 'Piano Brands',
                    ])
                    ->nullable(),

                Textarea::make('excerpt')
                    ->rows(3)
                    ->maxLength(500)
                    ->nullable(),

                RichEditor::make('content')
                    ->nullable(),

                FileUpload::make('featured_image')
                    ->image()
                    ->disk('public')
                    ->directory('blogs')
                    ->nullable(),

                DateTimePicker::make('published_at')
                    ->nullable(),

                Toggle::make('is_published')
                    ->default(false),
            ]);
    }
}
