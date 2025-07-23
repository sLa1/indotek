'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MovieForm from '../../../../components/MovieForm';
import { fetchMovieById } from '../../../../services/api';
import { Movie } from '../../../../types/movie';

const EditMoviePage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const fetchMovie = async () => {
                try {
                    const fetchedMovie = await fetchMovieById(Number(id));
                    setMovie(fetchedMovie);
                } catch (err) {
                    setError('Failed to fetch movie details');
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">Loading...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }
    
    if (!movie) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">Movie not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Movie</h1>
                <MovieForm movie={movie} />
            </div>
        </div>
    );
};

export default EditMoviePage;