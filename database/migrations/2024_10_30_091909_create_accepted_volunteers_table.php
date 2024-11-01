<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcceptedVolunteersTable extends Migration
{
    public function up()
    {
        Schema::create('accepted_volunteers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The user who was accepted
            $table->string('full_name');
            $table->foreignId('volunteer_opportunity_id')->constrained()->onDelete('cascade'); // The specific volunteer opportunity
            $table->date('accepted_on')->nullable(); // Date when they were accepted
            $table->boolean('is_volunteered')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('accepted_volunteers');
    }
}
