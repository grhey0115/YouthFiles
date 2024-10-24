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
        Schema::create('certificate_requests', function (Blueprint $table) {
            $table->id();  // Primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to users table
            $table->string('fullName');  // Full name of the user
            $table->date('dateOfBirth');  // Date of birth of the user
            $table->string('gender');  // Gender of the user
            $table->string('address');  // Address of the user
            $table->string('contactNumber');  // Contact number of the user
            $table->string('email');  // Email of the user
            $table->string('documentType');  // Type of document requested
            $table->integer('numberOfCopies')->default(1);  // Number of copies requested
            $table->string('purpose');  // Purpose of the document request
            $table->string('deliveryMethod');  // Method of delivery (e.g., "Pick-up")
            $table->string('paymentMethod');  // Method of payment (e.g., "Cash on Pick-up")
            $table->string('status')->default('pending');  // Status of the request (defaults to "pending")
            $table->timestamps();  // Auto-generated created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificate_requests');
    }
};
