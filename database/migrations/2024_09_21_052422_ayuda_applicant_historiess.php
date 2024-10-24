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
        Schema::create('ayuda_applicant_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayuda_applicant_id')->constrained('ayuda_applicants')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('aid_type');
            $table->enum('status', ['received', 'pending', 'completed', 'failed'])->default('pending');
            $table->dateTime('received_at')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ayuda_applicant_histories');
    }
};
