<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToAnnouncementsTable extends Migration
{
    public function up()
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->timestamp('published_at')->nullable()->after('message');
        });
    }

    public function down()
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->dropColumn(['title', 'message', 'published_at']);
        });
    }
}
