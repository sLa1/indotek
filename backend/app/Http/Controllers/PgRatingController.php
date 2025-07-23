<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\PgRating;
use Illuminate\Http\JsonResponse;

class PgRatingController extends BaseController
{
    /**
     * Display a listing of all PG ratings.
     */
    public function index(): JsonResponse
    {
        $pgRatings = PgRating::all();
        
        return $this->successResponse($pgRatings);
    }
}
