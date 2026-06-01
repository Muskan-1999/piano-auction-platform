<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lot_id')->constrained('lots')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('bid_type');
            $table->string('status')->default('active');
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->dateTime('placed_at');
            $table->boolean('is_winning')->default(false);
            $table->boolean('is_live_bid')->default(true);
            $table->timestamps();

            $table->index(['lot_id', 'user_id']);
            $table->index(['status', 'is_winning']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};
