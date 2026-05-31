<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add permanent winner flag to bids (is_winning = live leader, is_winner = final winner)
        Schema::table('bids', function (Blueprint $table) {
            $table->boolean('is_winner')->default(false)->after('is_winning');
            $table->index('is_winner');
        });

        // Add sold timestamp to lots
        Schema::table('lots', function (Blueprint $table) {
            $table->dateTime('sold_at')->nullable()->after('winning_bid_amount');
        });
    }

    public function down(): void
    {
        Schema::table('bids', function (Blueprint $table) {
            $table->dropIndex(['is_winner']);
            $table->dropColumn('is_winner');
        });

        Schema::table('lots', function (Blueprint $table) {
            $table->dropColumn('sold_at');
        });
    }
};
