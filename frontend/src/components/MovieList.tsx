'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import { Movie } from '../types/movie';
import { fetchMovies, deleteMovie } from '../services/api';
import ModernSearch from './ModernSearch';
import MovieCard from './MovieCard';
import Modal from './Modal';
import MovieForm from './MovieForm';
import Loader from './Loader';
import ConfirmDialog from './ConfirmDialog';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<number | undefined>(undefined);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

    const loadMovies = async (pgRatingId?: number) => {
        try {
            setLoading(true);
            const data = await fetchMovies(pgRatingId);
            setMovies(data);
        } catch (err) {
            toast.error('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const handleFilterChange = (pgRatingId: number | undefined) => {
        setFilter(pgRatingId);
        loadMovies(pgRatingId);
    };

    const handleEdit = (movie: Movie) => {
        setEditingMovie(movie);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            setDeletingMovie(movie);
            setIsDeleteModalOpen(true);
        }
    };

    const confirmDelete = async () => {
        if (deletingMovie) {
            try {
                await deleteMovie(deletingMovie.id);
                const updatedMovies = movies.filter(movie => movie.id !== deletingMovie.id);
                setMovies(updatedMovies);
                toast.success('Movie deleted successfully');
            } catch (err) {
                toast.error('Failed to delete movie');
            } finally {
                setDeletingMovie(null);
                setIsDeleteModalOpen(false);
            }
        }
    };

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        loadMovies(filter);
        toast.success('Movie created successfully!');
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setEditingMovie(null);
        loadMovies(filter);
        toast.success('Movie updated successfully!');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <Toaster position="top-right" />
            
            {/* Header */}
            <motion.div 
                className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40"
                initial="hidden"
                animate="visible"
                variants={headerVariants}
            >
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <Link href="/" className="cursor-pointer">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-colors duration-200">
                                    Movie Collection
                                </h1>
                            </Link>
                            <p className="text-gray-600 mt-2">
                                Discover and manage your favorite movies
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <ModernSearch 
                                onFilterChange={handleFilterChange} 
                                currentFilter={filter} 
                            />
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsCreateModalOpen(true)}
                                className="btn-primary flex items-center whitespace-nowrap"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Movie
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader size="lg" text="Loading your movie collection..." />
                    </div>
                ) : movies.length === 0 ? (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <FunnelIcon className="w-16 h-16 text-gray-300 mx-auto" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                No movies found
                            </h3>
                            <p className="text-gray-600 mb-8">
                                {filter ? 'Try adjusting your filter or create a new movie.' : 'Start building your collection by adding your first movie!'}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsCreateModalOpen(true)}
                                className="btn-primary flex items-center justify-center mx-auto"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add First Movie
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="movie-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {movies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Add New Movie"
                size="lg"
            >
                <MovieForm onSuccess={handleCreateSuccess} />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingMovie(null);
                }}
                title="Edit Movie"
                size="lg"
            >
                {editingMovie && (
                    <MovieForm 
                        movie={editingMovie} 
                        onSuccess={handleEditSuccess} 
                    />
                )}
            </Modal>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingMovie(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Movie"
                message={`Are you sure you want to delete "${deletingMovie?.title}"? This action cannot be undone.`}
                confirmText="Delete Movie"
                cancelText="Cancel"
                isDestructive={true}
            />
        </div>
    );
};

export default MovieList;