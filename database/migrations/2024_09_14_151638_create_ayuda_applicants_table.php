<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAyudaApplicantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ayuda_applicants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ayuda_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('status', ['pending', 'approved', 'disapproved'])->default('pending');
            $table->timestamp('notified_at')->nullable();
            $table->boolean('compliance_status')->default(false);
            $table->enum('payment_method', ['cash', 'digital'])->nullable();
            $table->enum('payment_status', ['pending', 'completed'])->default('pending');
            $table->boolean('aid_received')->default(false);
            $table->text('distribution_tracking')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('ayuda_id')->references('id')->on('ayudas')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ayuda_applicants');
    }
}
