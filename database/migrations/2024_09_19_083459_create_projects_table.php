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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name of the project
            $table->text('description')->nullable(); // Description of the project
            $table->date('start_date')->nullable(); // Project start date
            $table->date('end_date')->nullable(); // Project end date
            $table->decimal('total_budget', 15, 2)->nullable(); // Total budget
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
