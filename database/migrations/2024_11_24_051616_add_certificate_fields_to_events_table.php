<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCertificateFieldsToEventsTable extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            // Add certificate-related columns
            $table->boolean('enable_certificates')->default(false);
            $table->string('certificate_template')->nullable()->default('default');
            
            // Create a separate table for certificate signatories
            Schema::create('event_certificate_signatories', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('event_id');
                $table->string('name');
                $table->string('role');
                $table->string('signature_path')->nullable();
                $table->timestamps();

                // Foreign key constraint
                $table->foreign('event_id')
                      ->references('id')
                      ->on('events')
                      ->onDelete('cascade');
            });
        });
    }

    public function down()
    {
        // Drop the signatories table first due to foreign key constraint
        Schema::dropIfExists('event_certificate_signatories');

        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'enable_certificates', 
                'certificate_template'
            ]);
        });
    }
}