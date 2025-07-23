<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PgRatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only seed if no PG ratings exist
        if (DB::table('pg_ratings')->count() > 0) {
            return;
        }

        DB::table('pg_ratings')->insert([
            [
                'code' => 'G',
                'name' => 'General Audiences',
                'description' => 'All ages admitted. Nothing that would offend parents for viewing by children.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PG',
                'name' => 'Parental Guidance Suggested',
                'description' => 'Some material may not be suitable for children.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'PG-13',
                'name' => 'Parents Strongly Cautioned',
                'description' => 'Some material may be inappropriate for children under 13.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'R',
                'name' => 'Restricted',
                'description' => 'Under 17 requires accompanying parent or adult guardian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
