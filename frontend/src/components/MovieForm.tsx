'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { Movie, CreateMovieData, PgRating } from '../types/movie';
import { createMovie, updateMovie, fetchPgRatings } from '../services/api';
import Loader from './Loader';

interface MovieFormProps {
  movie?: Movie;
  onSuccess?: () => void;
  redirectOnSuccess?: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSuccess, redirectOnSuccess = false }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [pgRatingId, setPgRatingId] = useState<number>(1);
  const [pgRatings, setPgRatings] = useState<PgRating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  useEffect(() => {
    const loadPgRatings = async () => {
      try {
        const ratings = await fetchPgRatings();
        setPgRatings(ratings);
        if (ratings.length > 0 && !movie) {
          setPgRatingId(ratings[0].id);
        }
      } catch (error) {
        console.error('Error fetching PG ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPgRatings();
  }, [movie]);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setPgRatingId(movie.pg_rating_id);
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!pgRatingId) {
      newErrors.pgRatingId = 'PG Rating is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    const movieData: CreateMovieData = { 
      title: title.trim(), 
      description: description.trim(), 
      pg_rating_id: pgRatingId 
    };

    try {
      if (movie) {
        await updateMovie(movie.id, movieData);
      } else {
        await createMovie(movieData);
      }
      
      if (onSuccess) {
        onSuccess();
      } else if (redirectOnSuccess && !movie) {
        // Redirect to movies page after successful creation
        router.push('/movies');
      }
    } catch (error: any) {
      console.error('Error saving movie:', error);
      
      // Handle validation errors from backend
      if (error.validationErrors) {
        const backendErrors: {[key: string]: string} = {};
        
        // Map backend errors to frontend error format
        Object.keys(error.validationErrors).forEach(field => {
          const messages = error.validationErrors[field];
          if (Array.isArray(messages) && messages.length > 0) {
            // Map backend field names to frontend field names
            if (field === 'title') {
              backendErrors.title = messages[0];
            } else if (field === 'description') {
              backendErrors.description = messages[0];
            } else if (field === 'pg_rating_id') {
              backendErrors.pgRatingId = messages[0];
            }
          }
        });
        
        if (Object.keys(backendErrors).length > 0) {
          setErrors(backendErrors);
        } else {
          setErrors({ general: 'Validation failed. Please check your input.' });
        }
      } else {
        setErrors({ general: 'Failed to save movie. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const selectOptions = pgRatings.map(rating => ({
    value: rating.id,
    label: `${rating.code} - ${rating.name}`,
    rating
  }));

  const selectedOption = selectOptions.find(option => option.value === pgRatingId);

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '6px',
      boxShadow: 'none',
      backgroundColor: 'white',
      color: '#374151',
      '&:hover': {
        borderColor: '#a855f7'
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#374151'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#6b7280'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
        ? '#f3f4f6' 
        : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected 
          ? '#3b82f6' 
          : '#f3f4f6'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999
    })
  };

  if (loading) {
    return <Loader size="md" text="Loading form..." />;
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {errors.general && (
        <motion.div 
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {errors.general}
        </motion.div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Movie Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
          }}
          className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500' : ''}`}
          placeholder="Enter movie title..."
        />
        {errors.title && (
          <motion.p 
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.title}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
          }}
          rows={4}
          className={`input-field resize-none ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
          placeholder="Enter movie description..."
        />
        {errors.description && (
          <motion.p 
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.description}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
          PG Rating *
        </label>
        <Select
          options={selectOptions}
          value={selectedOption}
          onChange={(option) => {
            if (option) {
              setPgRatingId(option.value);
              if (errors.pgRatingId) setErrors(prev => ({ ...prev, pgRatingId: '' }));
            }
          }}
          styles={customSelectStyles}
          placeholder="Select PG Rating..."
          isSearchable
          menuPortalTarget={document.body}
          menuPosition="fixed"
          className={errors.pgRatingId ? 'ring-2 ring-red-300' : ''}
        />
        {errors.pgRatingId && (
          <motion.p 
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.pgRatingId}
          </motion.p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <motion.button 
          type="submit"
          disabled={submitting}
          className={`btn-primary flex items-center justify-center flex-1 ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={submitting ? {} : { scale: 1.02 }}
          whileTap={submitting ? {} : { scale: 0.98 }}
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              {movie ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <CheckIcon className="w-5 h-5 mr-2" />
              {movie ? 'Update Movie' : 'Create Movie'}
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MovieForm;