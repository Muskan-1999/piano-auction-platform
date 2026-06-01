<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lots', function (Blueprint $table) {
            $table->foreignId('winner_id')
                ->nullable()
                ->after('is_active')
                ->constrained('users')
                ->nullOnDelete();

            $table->decimal('winning_bid_amount', 10, 2)
                ->nullable()
                ->after('winner_id');

            $table->index('winner_id');
        });
    }

    public function down(): void
    {
        Schema::table('lots', function (Blueprint $table) {
            $table->dropForeign(['winner_id']);
            $table->dropIndex(['winner_id']);
            $table->dropColumn(['winner_id', 'winning_bid_amount']);
        });
    }
};
