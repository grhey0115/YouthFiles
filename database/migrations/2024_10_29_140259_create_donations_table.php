<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayuda_id')->constrained()->onDelete('cascade'); // Foreign key to Ayuda
            $table->string('title'); // Donation campaign title
            $table->enum('donation_type', ['money', 'item', 'service']); // Type of donation
            $table->decimal('goal', 10, 2)->nullable(); // Monetary goal (if money type)
            $table->decimal('amount_raised', 10, 2)->default(0); // Total amount raised (if money type)
            $table->integer('quantity')->nullable(); // Quantity of items/services (if applicable)
            $table->text('description')->nullable(); // Description of the donation
            $table->decimal('estimated_value', 10, 2)->nullable(); // Estimated value of items/services
            $table->date('deadline')->nullable(); // Optional deadline for donations
            $table->boolean('is_active')->default(true); // Active/inactive status
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
