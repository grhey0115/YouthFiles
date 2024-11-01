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
        Schema::table('user_donations', function (Blueprint $table) {
            $table->foreignId('ayuda_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('user_donations', function (Blueprint $table) {
            $table->dropForeign(['ayuda_id']);
            $table->dropColumn('ayuda_id');
        });
    }
};
