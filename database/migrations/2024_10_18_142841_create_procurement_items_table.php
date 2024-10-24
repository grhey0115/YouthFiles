<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procurement_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procurement_id')->constrained()->onDelete('cascade'); // Foreign key to procurement
            $table->string('description');  // Item description
            $table->integer('quantity');    // Quantity
            $table->decimal('unit_cost', 10, 2); // Cost per unit
            $table->decimal('total_cost', 10, 2); // Total cost
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_items');
    }
};
