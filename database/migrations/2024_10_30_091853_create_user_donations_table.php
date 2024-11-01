<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDonationsTable extends Migration
{
    public function up()
    {
        Schema::create('user_donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // References the user who made the donation
            $table->foreignId('donation_id')->constrained()->onDelete('cascade'); // References the specific donation campaign

            // Monetary donations
            $table->decimal('amount', 10, 2)->nullable(); // Donation amount for monetary donations
            $table->string('reference_number')->nullable(); // Reference number for online transactions
            $table->string('receipt')->nullable(); // File path to the uploaded receipt image or document

            // Item donations
            $table->integer('quantity')->nullable(); // Quantity of items donated, applicable for item donations
            $table->text('description')->nullable(); // Description of the donated item(s)
            $table->decimal('estimated_value', 10, 2)->nullable(); // Estimated value of the donated items, if provided

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_donations');
    }
}
