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
        Schema::create('ayudas', function (Blueprint $table) {
            $table->id();
            $table->string('header')->nullable(); // For storing image path
            $table->string('title');
            $table->string('sector');
            $table->string('filter')->nullable();
            $table->date('date_start');
            $table->date('date_end');
            $table->boolean('requirements_needed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ayudas');
    }
};