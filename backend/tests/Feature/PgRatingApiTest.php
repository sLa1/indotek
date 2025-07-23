<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Symfony\Component\HttpFoundation\Response;

class PgRatingApiTest extends TestCase
{
    const DATA_STRUCTURE = [
        '*' => [
            'id',
            'code',
            'name',
            'description',
            'created_at',
            'updated_at'
        ]
    ];

    private string $url;

    protected function setUp(): void
    {
        parent::setUp();

        DB::beginTransaction();
        $this->url = '/api/pg-ratings';
    }

    public function tearDown(): void
    {
        DB::rollback();
        parent::tearDown();
    }

    public function test_can_get_all_pg_ratings(): void
    {
        $response = $this->get($this->url);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure(self::DATA_STRUCTURE);
    }

    public function test_pg_ratings_response_contains_data(): void
    {
        $response = $this->get($this->url);
        $response->assertStatus(Response::HTTP_OK);
        
        $data = $response->json();
        $this->assertIsArray($data);
    }
}
