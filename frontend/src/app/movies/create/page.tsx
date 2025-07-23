'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, HomeIcon, FilmIcon } from '@heroicons/react/24/outline';
import MovieForm from '../../../components/MovieForm';

const CreateMoviePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Navigation Header */}
            <motion.div 
                className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/movies"
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                                <span className="font-medium">Back to Movies</span>
                            </Link>
                            <div className="hidden sm:block text-gray-300">|</div>
                            <Link 
                                href="/"
                                className="hidden sm:flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <HomeIcon className="w-4 h-4 mr-1" />
                                <span>Home</span>
                            </Link>
                        </div>
                        
                        <div className="flex items-center">
                            <FilmIcon className="w-6 h-6 text-blue-600 mr-2" />
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Create New Movie
                            </h1>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <FilmIcon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add a New Movie</h2>
                            <p className="text-gray-600">Fill in the details below to add a movie to your collection</p>
                        </div>
                        
                        <MovieForm redirectOnSuccess={true} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateMoviePage;