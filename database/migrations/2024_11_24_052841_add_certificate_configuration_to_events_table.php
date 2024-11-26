<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCertificateConfigurationToEventsTable extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            // Certificate configuration fields
            $table->string('certificate_theme')->default('default');
            $table->string('certificate_primary_color')->nullable();
            $table->string('certificate_secondary_color')->nullable();
            $table->string('certificate_orientation')->default('landscape');
            $table->string('certificate_paper_size')->default('a4');
        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'enable_certificates',
                'certificate_theme',
                'certificate_primary_color',
                'certificate_secondary_color',
                'certificate_orientation',
                'certificate_paper_size'
            ]);
        });
    }
}