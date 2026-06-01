<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sell_my_pianos', function (Blueprint $table) {
            $table->id();

            // Personal details
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone', 30);

            // Valuation
            $table->string('valuation_type');

            // Piano details
            $table->string('piano_type');
            $table->string('piano_make');
            $table->string('piano_model')->nullable();
            $table->string('piano_colour');
            $table->string('serial_number')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('age_of_piano')->nullable();
            $table->string('ivory_keys');
            $table->string('tuned_recently');
            $table->string('reconditioned');
            $table->text('ownership_history');
            $table->text('condition_description');
            $table->text('additional_notes')->nullable();

            // Address
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('postcode');
            $table->string('country')->default('United Kingdom');

            // Contact preferences
            $table->boolean('collection_address_different')->default(false);
            $table->string('preferred_contact_method')->default('email');
            $table->string('preferred_contact_time')->nullable();

            // Images (JSON array of paths)
            $table->json('images')->nullable();

            // Admin fields
            $table->string('status')->default('pending');
            $table->decimal('estimated_value', 12, 2)->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('contacted_at')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sell_my_pianos');
    }
};
