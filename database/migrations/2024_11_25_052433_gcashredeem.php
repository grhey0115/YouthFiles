<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('points_redemptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('points_redeemed');
            $table->decimal('gcash_amount', 10, 2);
            $table->string('gcash_name');
            $table->string('gcash_number');
            $table->enum('status', [
                'pending', 
                'processing', 
                'completed', 
                'failed', 
                'cancelled'
            ])->default('pending');
            $table->text('remarks')->nullable();
            $table->string('transaction_reference')->nullable();
            $table->timestamps();
        });

        // Add points column to users table if not exists
        if (!Schema::hasColumn('users', 'youth_points')) {
            Schema::table('users', function (Blueprint $table) {
                $table->integer('youth_points')->default(0)->after('email');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('points_redemptions');

        // Optional: Remove youth_points column
        if (Schema::hasColumn('users', 'youth_points')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('youth_points');
            });
        }
    }
};