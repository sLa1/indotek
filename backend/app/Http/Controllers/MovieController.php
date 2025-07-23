<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MovieController extends BaseController
{
    /**
     * Display a listing of movies with optional PG rating filter.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Movie::with('pgRating');
            
            // Apply PG rating filter if provided
            if ($request->filled('pg_rating_id')) {
                $query->where('pg_rating_id', $request->input('pg_rating_id'));
            }
            
            $movies = $query->get();
            
            return $this->successResponse($movies);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve movies', [], 500);
        }
    }

    /**
     * Display the specified movie.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $movie = Movie::with('pgRating')->findOrFail($id);
            
            return $this->successResponse($movie);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Movie not found', [], 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve movie', [], 500);
        }
    }

    /**
     * Store a newly created movie in storage.
     */
    public function store(StoreMovieRequest $request): JsonResponse
    {
        try {
            $movie = Movie::create($request->validated());
            $movie->load('pgRating');
            
            return $this->successResponse($movie, 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create movie', [], 500);
        }
    }

    /**
     * Update the specified movie in storage.
     */
    public function update(UpdateMovieRequest $request, int $id): JsonResponse
    {
        try {
            $movie = Movie::findOrFail($id);
            $movie->update($request->validated());
            $movie->load('pgRating');
            
            return $this->successResponse($movie);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Movie not found', [], 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update movie', [], 500);
        }
    }

    /**
     * Remove the specified movie from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $movie = Movie::findOrFail($id);
            $movie->delete();
            
            return $this->successResponse(null, 204);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Movie not found', [], 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete movie', [], 500);
        }
    }
}