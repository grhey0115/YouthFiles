<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusToUserDonationsTable extends Migration
{
    public function up()
    {
        Schema::table('user_donations', function (Blueprint $table) {
            $table->string('status')->default('pending'); // Status of donation verification
        });
    }

    public function down()
    {
        Schema::table('user_donations', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
}