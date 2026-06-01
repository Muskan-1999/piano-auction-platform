<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Make lot_id nullable so guest submissions work without a matching lot record
        DB::statement('ALTER TABLE telephone_bids MODIFY lot_id BIGINT UNSIGNED NULL');
        DB::statement('ALTER TABLE absentee_bids MODIFY lot_id BIGINT UNSIGNED NULL');

        // Make max_bid_amount nullable so absentee bids don't require it up-front
        DB::statement('ALTER TABLE absentee_bids MODIFY max_bid_amount DECIMAL(15,2) NULL');

        Schema::table('telephone_bids', function (Blueprint $table) {
            if (!Schema::hasColumn('telephone_bids', 'first_name')) {
                $table->string('first_name')->nullable()->after('guest_name');
            }
            if (!Schema::hasColumn('telephone_bids', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
            if (!Schema::hasColumn('telephone_bids', 'address')) {
                $table->string('address')->nullable()->after('last_name');
            }
            if (!Schema::hasColumn('telephone_bids', 'post_code')) {
                $table->string('post_code')->nullable()->after('address');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_1_number')) {
                $table->string('lot_1_number')->nullable()->after('post_code');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_1_description')) {
                $table->text('lot_1_description')->nullable()->after('lot_1_number');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_2_number')) {
                $table->string('lot_2_number')->nullable()->after('lot_1_description');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_2_description')) {
                $table->text('lot_2_description')->nullable()->after('lot_2_number');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_3_number')) {
                $table->string('lot_3_number')->nullable()->after('lot_2_description');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_3_description')) {
                $table->text('lot_3_description')->nullable()->after('lot_3_number');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_4_number')) {
                $table->string('lot_4_number')->nullable()->after('lot_3_description');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_4_description')) {
                $table->text('lot_4_description')->nullable()->after('lot_4_number');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_5_number')) {
                $table->string('lot_5_number')->nullable()->after('lot_4_description');
            }
            if (!Schema::hasColumn('telephone_bids', 'lot_5_description')) {
                $table->text('lot_5_description')->nullable()->after('lot_5_number');
            }
        });

        Schema::table('absentee_bids', function (Blueprint $table) {
            if (!Schema::hasColumn('absentee_bids', 'first_name')) {
                $table->string('first_name')->nullable()->after('guest_name');
            }
            if (!Schema::hasColumn('absentee_bids', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
            if (!Schema::hasColumn('absentee_bids', 'address')) {
                $table->string('address')->nullable()->after('last_name');
            }
            if (!Schema::hasColumn('absentee_bids', 'post_code')) {
                $table->string('post_code')->nullable()->after('address');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_1_number')) {
                $table->string('lot_1_number')->nullable()->after('post_code');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_1_description')) {
                $table->text('lot_1_description')->nullable()->after('lot_1_number');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_2_number')) {
                $table->string('lot_2_number')->nullable()->after('lot_1_description');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_2_description')) {
                $table->text('lot_2_description')->nullable()->after('lot_2_number');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_3_number')) {
                $table->string('lot_3_number')->nullable()->after('lot_2_description');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_3_description')) {
                $table->text('lot_3_description')->nullable()->after('lot_3_number');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_4_number')) {
                $table->string('lot_4_number')->nullable()->after('lot_3_description');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_4_description')) {
                $table->text('lot_4_description')->nullable()->after('lot_4_number');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_5_number')) {
                $table->string('lot_5_number')->nullable()->after('lot_4_description');
            }
            if (!Schema::hasColumn('absentee_bids', 'lot_5_description')) {
                $table->text('lot_5_description')->nullable()->after('lot_5_number');
            }
        });
    }

    public function down(): void
    {
        $telColumns = [
            'first_name', 'last_name', 'address', 'post_code',
            'lot_1_number', 'lot_1_description', 'lot_2_number', 'lot_2_description',
            'lot_3_number', 'lot_3_description', 'lot_4_number', 'lot_4_description',
            'lot_5_number', 'lot_5_description',
        ];
        Schema::table('telephone_bids', function (Blueprint $table) use ($telColumns) {
            foreach ($telColumns as $col) {
                if (Schema::hasColumn('telephone_bids', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
        Schema::table('absentee_bids', function (Blueprint $table) use ($telColumns) {
            foreach ($telColumns as $col) {
                if (Schema::hasColumn('absentee_bids', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
