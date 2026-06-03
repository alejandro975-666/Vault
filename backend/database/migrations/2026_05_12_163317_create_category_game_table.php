<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('game_category', function (Blueprint $table) {
            $table->uuid('game_id');
            $table->uuid('category_id');

            $table->foreign('game_id')
                  ->references('id')
                  ->on('games')
                  ->onDelete('cascade');

            $table->foreign('category_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade');

            $table->primary(['game_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_category');
    }
};