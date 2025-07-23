<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Movie extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'description',
        'pg_rating_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'pg_rating_id' => 'integer',
    ];

    /**
     * Get the PG rating that owns the movie.
     */
    public function pgRating(): BelongsTo
    {
        return $this->belongsTo(PgRating::class);
    }
}