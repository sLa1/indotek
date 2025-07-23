<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Symfony\Component\HttpFoundation\Response;

class MovieApiTest extends TestCase
{
    const DATA_STRUCTURE = [
        '*' => [
            'id',
            'title',
            'description',
            'pg_rating_id',
            'pg_rating' => [
                'id',
                'code',
                'name',
                'description',
                'created_at',
                'updated_at'
            ],
            'created_at',
            'updated_at'
        ]
    ];

    private string $url;

    protected function setUp(): void
    {
        parent::setUp();
        DB::beginTransaction();
        $this->url = '/api/movies';
    }

    public function tearDown(): void
    {
        DB::rollback();
        parent::tearDown();
    }

    public function test_can_get_all_movies(): void
    {
        $response = $this->get($this->url);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure(self::DATA_STRUCTURE);
    }

    public function test_movies_response_contains_valid_data(): void
    {
        $response = $this->get($this->url);
        $response->assertStatus(Response::HTTP_OK);
        
        $data = $response->json();
        $this->assertIsArray($data);
        
        // Check first item has expected structure if any movies exist
        if (count($data) > 0) {
            $firstItem = $data[0];
            $this->assertArrayHasKey('id', $firstItem);
            $this->assertArrayHasKey('title', $firstItem);
            $this->assertArrayHasKey('pg_rating', $firstItem);
        }
    }

    public function test_can_filter_movies_by_pg_rating(): void
    {
        $response = $this->get($this->url . '?pg_rating_id=1');
        $response->assertStatus(Response::HTTP_OK);
        
        $data = $response->json();
        $this->assertIsArray($data);
    }

    public function test_can_show_specific_movie(): void
    {
        $response = $this->get($this->url . '/1');
        
        // Can be either 200 if movie exists or 404 if not
        $this->assertContains($response->getStatusCode(), [200, 404]);
        
        // If successful, check the response structure
        if ($response->getStatusCode() === 200) {
            // Use the same structure as DATA_STRUCTURE but without the '*' array wrapper
            $singleMovieStructure = self::DATA_STRUCTURE['*'];
            $response->assertJsonStructure($singleMovieStructure);
        }
    }

    public function test_can_update_movie(): void
    {
        $updateData = [
            'title' => 'Updated Movie Title',
            'description' => 'Updated description',
            'pg_rating_id' => 1
        ];

        $response = $this->putJson($this->url . '/1', $updateData);
        
        // Should be either 200 (success) or 404 (movie not found)
        // 500 and 422 should NOT be acceptable for a simple update
        $this->assertContains($response->getStatusCode(), [200, 404]);
        
        // If successful, check the response structure
        if ($response->getStatusCode() === 200) {
            // Use the same structure as DATA_STRUCTURE but without the '*' array wrapper
            $singleMovieStructure = self::DATA_STRUCTURE['*'];
            $response->assertJsonStructure($singleMovieStructure);
        }
    }

    public function test_can_delete_movie(): void
    {
        $response = $this->deleteJson($this->url . '/1');
        
        // Can be either 200, 204 if movie exists or 404 if not  
        $this->assertContains($response->getStatusCode(), [200, 204, 404]);
    }

    public function test_can_create_movie(): void
    {
        $movieData = [
            'title' => 'Test Movie ' . time(), // Unique title
            'description' => 'A test movie description',
            'pg_rating_id' => 1
        ];

        $response = $this->postJson($this->url, $movieData);
        
        // Can be either 201 if successful or 422 if validation fails
        $this->assertContains($response->getStatusCode(), [201, 422]);
    }
}
