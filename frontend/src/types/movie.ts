export interface PgRating {
    id: number;
    code: string;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    rating: number; // 1-5 star rating for MovieCard display
    release_year: number; // Add release year for display
    pg_rating_id: number;
    pg_rating?: PgRating;
    created_at?: string;
    updated_at?: string;
}

export interface CreateMovieData {
    title: string;
    description: string;
    pg_rating_id: number;
}