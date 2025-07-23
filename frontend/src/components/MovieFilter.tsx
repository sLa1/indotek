'use client';

import React, { useEffect, useState } from 'react';
import { PgRating } from '../types/movie';
import { fetchPgRatings } from '../services/api';

interface MovieFilterProps {
  onFilterChange: (filter: number | undefined) => void;
  currentFilter: number | undefined;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange, currentFilter }) => {
  const [pgRatings, setPgRatings] = useState<PgRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPgRatings = async () => {
      try {
        const ratings = await fetchPgRatings();
        setPgRatings(ratings);
      } catch (error) {
        console.error('Error fetching PG ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPgRatings();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFilterChange(value ? parseInt(value) : undefined);
  };

  if (loading) {
    return <div className="mb-6">Loading ratings...</div>;
  }

  return (
    <div className="mb-6">
      <label htmlFor="pg-rating" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by PG Rating:
      </label>
      <select 
        id="pg-rating" 
        onChange={handleFilterChange}
        value={currentFilter || ''}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Movies</option>
        {pgRatings.map((rating) => (
          <option key={rating.id} value={rating.id}>
            {rating.code} - {rating.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilter;