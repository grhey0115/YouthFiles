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
        Schema::table('ayudas', function (Blueprint $table) {
            $table->json('filter')->nullable()->after('description');// Add eligibility filter
            $table->integer('max_beneficiaries')->nullable()->after('filter'); // Add max beneficiaries
            $table->string('disbursement_method')->nullable()->after('max_beneficiaries'); // Add disbursement method
            $table->string('assistance_type')->nullable()->after('disbursement_method'); // Add type of assistance
            $table->string('status')->default('pending_approval')->after('assistance_type'); // Add status
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ayuda', function (Blueprint $table) {
            //
        });
    }
};
