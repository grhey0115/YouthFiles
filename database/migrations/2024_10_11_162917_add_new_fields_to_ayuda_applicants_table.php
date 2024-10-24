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
        Schema::table('ayuda_applicants', function (Blueprint $table) {
            $table->string('full_name')->nullable(); // Add full_name column
            $table->dateTime('applied_at')->nullable(); // Add applied_at column
            $table->enum('assistance_received', ['pending', 'received', 'not_received'])->default('pending'); // Add assistance_received column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ayuda_applicants', function (Blueprint $table) {
            //
        });
    }
};
