<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('gcash_redemption_configs', function (Blueprint $table) {
            $table->id();
            $table->integer('points_required')->unique();
            $table->decimal('gcash_amount', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->integer('maximum_redemptions_per_month')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('gcash_redemption_configs');
    }
};