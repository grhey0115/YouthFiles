<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('digital_payment_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('payment_type');
            $table->string('payment_method');
            $table->string('reference_number')->unique();
            $table->string('recipient_account');
            $table->enum('status', [
                'pending', 
                'processing', 
                'completed', 
                'failed', 
                'reversed'
            ])->default('pending');
            $table->text('purpose')->nullable();
            $table->text('admin_notes')->nullable();
            $table->json('supporting_documents')->nullable();
            $table->timestamp('transaction_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('digital_payment_transfers');
    }
};