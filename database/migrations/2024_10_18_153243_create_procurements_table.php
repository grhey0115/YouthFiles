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
        Schema::create('procurements', function (Blueprint $table) {
            $table->id();  // Auto-incrementing ID field
            $table->string('pr_no')->unique();  // PR No as a unique identifier
            $table->unsignedBigInteger('project_id');  // Foreign key to project
            $table->decimal('procurement_cost', 15, 2); // Total procurement cost
            $table->date('procurement_date');  // Procurement date
            $table->string('purpose');  // Purpose or justification for procurement
            $table->enum('approval_status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');  // Approval status
            $table->json('procurement_officer')->nullable();  // JSON array for procurement officers
            $table->text('remarks')->nullable();  // Remarks field
            $table->timestamps();

            // Foreign key constraint referencing projects.id
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurements');
    }
};
