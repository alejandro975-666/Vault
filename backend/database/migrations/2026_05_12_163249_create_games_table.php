<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('developer')->nullable();
            $table->string('publisher')->nullable();
            $table->date('release_date')->nullable();
            $table->decimal('price', 8, 2)->default(0);
            $table->decimal('original_price', 8, 2)->nullable();
            $table->decimal('discount_price', 8, 2)->nullable();
            $table->unsignedTinyInteger('discount')->default(0);
            $table->string('image_url')->nullable();
            $table->string('platform')->nullable();
            $table->string('languages')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->uuid('admin_id')->nullable();
            $table->foreign('admin_id')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};