<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRequirementsFileToAyudasTable extends Migration
{
    public function up()
    {
        // Adding the requirements_file column to the ayudas table
        Schema::table('ayudas', function (Blueprint $table) {
            $table->string('requirements_file')->nullable(); // Add the new column
        });

        // Ensure the ayuda_user pivot table exists
        if (!Schema::hasTable('ayuda_user')) {
            Schema::create('ayuda_user', function (Blueprint $table) {
                $table->id();
                $table->foreignId('ayuda_id')->constrained()->onDelete('cascade');
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->boolean('attended')->default(false);
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::table('ayudas', function (Blueprint $table) {
            $table->dropColumn('requirements_file'); // Remove the column if rolling back
        });

        // Optionally drop the pivot table if you want to clean up
        if (Schema::hasTable('ayuda_user')) {
            Schema::dropIfExists('ayuda_user');
        }
    }
}