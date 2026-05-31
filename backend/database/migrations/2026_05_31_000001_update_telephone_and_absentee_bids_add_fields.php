<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('telephone_bids', function (Blueprint $table) {
            if (!Schema::hasColumn('telephone_bids', 'preferred_call_time')) {
                $table->string('preferred_call_time')->nullable()->after('country');
            }
            if (!Schema::hasColumn('telephone_bids', 'one_piano_only')) {
                $table->boolean('one_piano_only')->default(false)->after('preferred_call_time');
            }
            if (!Schema::hasColumn('telephone_bids', 'additional_notes')) {
                $table->text('additional_notes')->nullable()->after('notes');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_description')) {
                $table->text('lot_description')->nullable()->after('guest_name');
            }
        });

        Schema::table('absentee_bids', function (Blueprint $table) {
            if (!Schema::hasColumn('absentee_bids', 'currency')) {
                $table->string('currency')->default('GBP')->after('country');
            }
            if (!Schema::hasColumn('absentee_bids', 'max_bid_per_lot')) {
                $table->decimal('max_bid_per_lot', 15, 2)->nullable()->after('max_bid_amount');
            }
            if (!Schema::hasColumn('absentee_bids', 'one_piano_only')) {
                $table->boolean('one_piano_only')->default(false)->after('currency');
            }
            if (!Schema::hasColumn('absentee_bids', 'additional_notes')) {
                $table->text('additional_notes')->nullable()->after('notes');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_description')) {
                $table->text('lot_description')->nullable()->after('guest_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('telephone_bids', function (Blueprint $table) {
            if (Schema::hasColumn('telephone_bids', 'lot_description')) {
                $table->dropColumn('lot_description');
            }
            if (Schema::hasColumn('telephone_bids', 'additional_notes')) {
                $table->dropColumn('additional_notes');
            }
            if (Schema::hasColumn('telephone_bids', 'one_piano_only')) {
                $table->dropColumn('one_piano_only');
            }
            if (Schema::hasColumn('telephone_bids', 'preferred_call_time')) {
                $table->dropColumn('preferred_call_time');
            }
        });

        Schema::table('absentee_bids', function (Blueprint $table) {
            if (Schema::hasColumn('absentee_bids', 'lot_description')) {
                $table->dropColumn('lot_description');
            }
            if (Schema::hasColumn('absentee_bids', 'additional_notes')) {
                $table->dropColumn('additional_notes');
            }
            if (Schema::hasColumn('absentee_bids', 'one_piano_only')) {
                $table->dropColumn('one_piano_only');
            }
            if (Schema::hasColumn('absentee_bids', 'max_bid_per_lot')) {
                $table->dropColumn('max_bid_per_lot');
            }
            if (Schema::hasColumn('absentee_bids', 'currency')) {
                $table->dropColumn('currency');
            }
        });
    }
};
