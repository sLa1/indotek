<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PgRating;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PgRating>
 */
class PgRatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PgRating::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $ratings = [
            ['code' => 'G', 'name' => 'General Audiences', 'description' => 'All ages admitted'],
            ['code' => 'PG', 'name' => 'Parental Guidance', 'description' => 'Some material may not be suitable for children'],
            ['code' => 'PG-13', 'name' => 'Parents Strongly Cautioned', 'description' => 'Some material may be inappropriate for children under 13'],
            ['code' => 'R', 'name' => 'Restricted', 'description' => 'Under 17 requires accompanying parent or adult guardian'],
        ];

        static $index = 0;
        $rating = $ratings[$index % count($ratings)];
        $index++;

        return $rating;
    }
}
