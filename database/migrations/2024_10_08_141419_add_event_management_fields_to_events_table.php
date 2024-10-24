<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEventManagementFieldsToEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {

            // Add event type field
            $table->string('type')->nullable(); // E.g., Seminar, Workshop, Sports, etc.

            // Add event category field
            $table->string('category')->nullable(); // E.g., Sports, Education, Outreach, etc.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            // Drop the added columns if rolling back migration
            $table->dropColumn(['status', 'type', 'category']);
        });
    }
}
