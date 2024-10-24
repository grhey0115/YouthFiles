<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to the user who made the payment
            $table->foreignId('event_id')->constrained()->onDelete('cascade'); // Link to the event
            $table->string('reference_number')->nullable();  // GCash reference number
            $table->string('receipt_image')->nullable();     // Uploaded receipt image
            $table->decimal('amount', 10, 2);  // Payment amount
            $table->string('status')->default('pending'); // Payment status: pending, successful, failed
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
