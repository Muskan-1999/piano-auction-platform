<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('value_my_pianos', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('valuation_type');
            $table->string('piano_type');
            $table->string('piano_make');
            $table->string('piano_model')->nullable();
            $table->string('piano_colour')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('ivory_keys')->nullable();
            $table->string('tuned')->nullable();
            $table->string('reconditioned')->nullable();
            $table->text('ownership_history')->nullable();
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('postcode');
            $table->string('country')->default('United Kingdom');
            $table->string('status')->default('new');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('value_my_pianos');
    }
};
