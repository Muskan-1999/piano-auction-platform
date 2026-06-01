<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_id')->constrained('auctions')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedInteger('lot_number');
            $table->text('description')->nullable();
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('serial_number')->nullable();
            $table->unsignedSmallInteger('year')->nullable();
            $table->string('condition')->nullable();
            $table->decimal('starting_bid', 10, 2);
            $table->decimal('reserve_price', 10, 2)->nullable();
            $table->decimal('current_bid', 10, 2)->nullable();
            $table->decimal('bid_increment', 10, 2)->default(50.00);
            $table->string('featured_image')->nullable();
            $table->json('gallery')->nullable();
            $table->dateTime('ends_at')->nullable();
            $table->string('status')->default('draft');
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            $table->index('auction_id');
            $table->index('status');
            $table->index('is_active');
            $table->unique(['auction_id', 'lot_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lots');
    }
};
