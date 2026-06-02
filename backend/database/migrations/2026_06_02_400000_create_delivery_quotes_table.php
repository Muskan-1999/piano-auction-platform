<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_quotes', function (Blueprint $table) {
            $table->id();

            // Personal details
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');

            // Piano details
            $table->string('piano_make')->nullable();
            $table->string('piano_model')->nullable();
            $table->string('piano_type')->default('Grand Piano');
            $table->string('estimated_value')->nullable();

            // Delivery address
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('city');
            $table->string('postcode');

            // Access — both fields are needed to give an accurate transport quote
            // has_stairs: affects labour time and specialist equipment required
            // num_stairs: more stairs = higher surcharge
            // is_lift:    if a lift is available alongside stairs, the team can use it
            //             (lower cost/risk than carrying up stairs manually)
            $table->boolean('has_stairs')->default(false);
            $table->unsignedSmallInteger('num_stairs')->nullable();
            $table->boolean('is_lift')->default(false);

            $table->text('delivery_notes')->nullable();

            // Admin workflow
            $table->string('status')->default('new');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_quotes');
    }
};
