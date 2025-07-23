'use client';

import React from 'react';
import { PencilIcon, TrashIcon, StarIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolid key={i} className="w-4 h-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <StarIcon className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden w-1/2">
              <StarSolid className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        {/* Header with title and rating */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
              {movie.title}
            </h3>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center">
                {renderStars(movie.rating)}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(movie)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <PencilIcon className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(movie.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <TrashIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Movie details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span>{movie.release_year}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <TagIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium">
              {movie.pg_rating?.code || 'Not Rated'}
            </span>
          </div>

          {movie.description && (
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {movie.description}
            </p>
          )}
        </div>

        {/* Bottom border animation */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
      </div>
    </motion.div>
  );
};

export default MovieCard;
