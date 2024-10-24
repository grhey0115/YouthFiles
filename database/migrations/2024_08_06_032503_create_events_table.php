<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    public function up()
    {
        // Check if the table already exists before creating it
        if (!Schema::hasTable('events')) {
            Schema::create('events', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('description');
                $table->dateTime('start_time');
                $table->dateTime('end_time');
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
}
