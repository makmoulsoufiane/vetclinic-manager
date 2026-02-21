<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('owners', function (Blueprint $table) {
            $table->foreignId('veterinarian_id')
                ->nullable()
                ->after('id')
                ->constrained('users')
                ->nullOnDelete();
        });

        Schema::table('consultations', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->nullable()
                ->after('animal_id')
                ->constrained('users')
                ->nullOnDelete();
        });

        $defaultVeterinarianId = DB::table('users')->where('role', 'veterinarian')->value('id');

        if ($defaultVeterinarianId) {
            DB::table('owners')
                ->whereNull('veterinarian_id')
                ->update(['veterinarian_id' => $defaultVeterinarianId]);

            DB::table('consultations')
                ->whereNull('user_id')
                ->update(['user_id' => $defaultVeterinarianId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consultations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });

        Schema::table('owners', function (Blueprint $table) {
            $table->dropConstrainedForeignId('veterinarian_id');
        });
    }
};
