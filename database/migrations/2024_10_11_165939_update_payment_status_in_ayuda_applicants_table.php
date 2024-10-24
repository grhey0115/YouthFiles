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
            $table->enum('payment_status', ['unpaid', 'paid', 'pending', 'failed'])->default('unpaid')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ayuda_applicants', function (Blueprint $table) {
            $table->string('payment_status')->nullable()->change();
        });
    }
};
