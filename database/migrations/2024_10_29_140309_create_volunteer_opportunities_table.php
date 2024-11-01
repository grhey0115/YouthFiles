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
        Schema::create('volunteer_opportunities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayuda_id')->constrained()->onDelete('cascade'); // Foreign key to Ayuda program
            $table->string('role_title'); // Title of the volunteer role
            $table->integer('slots'); // Number of volunteer slots available
            $table->text('description')->nullable(); // Description of the role
            $table->date('start_date'); // Start date for the volunteer role
            $table->date('end_date'); // End date for the volunteer role
            $table->text('requirements')->nullable(); // Specific requirements for the role
            $table->integer('points')->default(0); // Points awarded for this volunteer role
            $table->boolean('is_active')->default(true); // Toggle to make the role active/inactive
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteer_opportunities');
    }
};
