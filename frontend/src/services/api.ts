import axios from 'axios';
import { Movie, CreateMovieData, PgRating } from '../types/movie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Debug: Log the API URL being used
console.log('API_URL being used:', API_URL);
console.log('NEXT_PUBLIC_API_URL env var:', process.env.NEXT_PUBLIC_API_URL);

// Helper function to add mock data for frontend
const enhanceMovieData = (movie: any): Movie => ({
    ...movie,
    rating: Math.random() * 2 + 3, // Random rating between 3-5 for demo
    release_year: Math.floor(Math.random() * 30) + 1995, // Random year between 1995-2024
});

export const fetchMovies = async (pgRatingId?: number): Promise<Movie[]> => {
    const params = pgRatingId ? { pg_rating_id: pgRatingId } : {};
    const response = await axios.get(`${API_URL}/movies`, { params });
    return response.data.map(enhanceMovieData);
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return enhanceMovieData(response.data);
};

export const createMovie = async (movieData: CreateMovieData): Promise<Movie> => {
    try {
        const response = await axios.post(`${API_URL}/movies`, movieData);
        return enhanceMovieData(response.data);
    } catch (error: any) {
        if (error.response?.status === 422) {
            // Validation error - pass the errors to the caller
            throw {
                ...error,
                validationErrors: error.response.data.errors
            };
        }
        throw error;
    }
};

export const updateMovie = async (id: number, movieData: CreateMovieData): Promise<Movie> => {
    try {
        const response = await axios.put(`${API_URL}/movies/${id}`, movieData);
        return enhanceMovieData(response.data);
    } catch (error: any) {
        if (error.response?.status === 422) {
            // Validation error - pass the errors to the caller
            throw {
                ...error,
                validationErrors: error.response.data.errors
            };
        }
        throw error;
    }
};

export const deleteMovie = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/movies/${id}`);
};

export const fetchPgRatings = async (): Promise<PgRating[]> => {
    const response = await axios.get(`${API_URL}/pg-ratings`);
    return response.data;
};