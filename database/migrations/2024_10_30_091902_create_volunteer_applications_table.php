<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVolunteerApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('volunteer_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The user who applied
            $table->string('full_name');
            $table->foreignId('volunteer_opportunity_id')->constrained()->onDelete('cascade'); // The specific volunteer opportunity
            $table->string('status')->default('pending'); // Application status (pending, approved, rejected)
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('volunteer_applications');
    }
}
