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
        Schema::table('ayuda_applicant_files', function (Blueprint $table) {
            $table->unsignedBigInteger('requirement_id')->nullable()->after('ayuda_applicant_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ayuda_applicant_files', function (Blueprint $table) {
            $table->dropColumn('requirement_id');
        });
    }
};
