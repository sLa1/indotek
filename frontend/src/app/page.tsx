'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FilmIcon, PlusIcon, AdjustmentsHorizontalIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <motion.div 
                className="container mx-auto px-4 py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <FilmIcon className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
                        Movie Management
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of movie collection management with our modern, intuitive platform
                    </p>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row justify-center items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link 
                            href="/movies"
                            className="group relative overflow-hidden btn-primary min-w-[200px] flex items-center justify-center"
                        >
                            <FilmIcon className="w-5 h-5 mr-3" />
                            <span>View All Movies</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </Link>
                        <Link 
                            href="/movies/create"
                            className="group relative overflow-hidden bg-white text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl font-medium min-w-[200px] flex items-center justify-center"
                        >
                            <PlusIcon className="w-5 h-5 mr-3" />
                            <span>Add New Movie</span>
                        </Link>
                    </motion.div>
                </motion.div>
                
                {/* Features Grid */}
                <motion.div 
                    className="mt-24 grid md:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <motion.div 
                        className="group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <Link href="/movies/create" className="block">
                            <div className="card p-8 h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6 group-hover:rotate-6 transition-transform duration-300">
                                    <PlusIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">Create Movies</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Add new movies with rich details including title, description, and comprehensive PG rating system
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                    
                    <motion.div 
                        className="group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link href="/movies" className="block">
                            <div className="card p-8 h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl mb-6 group-hover:rotate-6 transition-transform duration-300">
                                    <AdjustmentsHorizontalIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">Smart Filtering</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Advanced search and filtering by PG ratings with modern dropdown interface and instant results
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                    
                    <motion.div 
                        className="group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        <div className="card p-8 h-full hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-6 group-hover:rotate-6 transition-transform duration-300">
                                <SparklesIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete CRUD</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Full lifecycle management with create, read, update, and delete operations in a beautiful interface
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div 
                    className="mt-24 bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                            <div className="text-gray-600">Movies Managed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
                            <div className="text-gray-600">PG Ratings</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">Fast</div>
                            <div className="text-gray-600">Search & Filter</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">Modern</div>
                            <div className="text-gray-600">UI Design</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HomePage;