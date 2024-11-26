<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('account_status', [
                'pending',
                'in_progress',
                'verified',
                'rejected',
                'suspended'
            ])->default('pending');
            
            $table->json('verification_steps')->nullable(); // Track specific steps
            $table->timestamp('verified_at')->nullable();
            $table->string('rejection_reason')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'account_status',
                'verification_steps',
                'verified_at',
                'rejection_reason'
            ]);
        });
    }
};
