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
        if (!Schema::hasColumn('user_devices', 'is_verified')) {
            Schema::table('user_devices', function (Blueprint $table) {
                $table->boolean('is_verified')->default(false)->after('otp_expires_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('user_devices', 'is_verified')) {
            Schema::table('user_devices', function (Blueprint $table) {
                $table->dropColumn('is_verified');
            });
        }
    }
};
