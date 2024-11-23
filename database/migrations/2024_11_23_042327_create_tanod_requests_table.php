<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTanodRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('tanod_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to users table
            $table->string('contact'); // Contact number of the requester
            $table->text('details'); // Details of the request
            $table->string('request_letter')->nullable(); // Path to the uploaded request letter
            $table->string('place'); // Place of the request
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // Status of the request
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tanod_requests');
    }
}
