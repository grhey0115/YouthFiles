<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('emergency_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('contact_number');
            $table->enum('assistance_type', [
                'health', 
                'financial', 
                'education', 
                'community', 
                'personal'
            ]);
            $table->text('description');
            $table->string('supporting_document')->nullable();
            $table->enum('status', [
                'pending', 
                'in_progress', 
                'resolved', 
                'rejected'
            ])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('emergency_requests');
    }
};