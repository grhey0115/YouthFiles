<?php

// database/migrations/xxxx_xx_xx_create_requirements_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequirementsTable extends Migration
{
    public function up()
    {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayuda_id')->constrained('ayudas')->onDelete('cascade'); // Link to Ayuda
            $table->string('requirement_name'); // Name of the requirement
            $table->text('description')->nullable(); // Optional description
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('requirements');
    }
}
