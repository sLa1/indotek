'use client';

import React, { useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PgRating } from '../types/movie';
import { fetchPgRatings } from '../services/api';
import Loader from './Loader';

interface ModernSearchProps {
  onFilterChange: (filter: number | undefined) => void;
  currentFilter: number | undefined;
}

const ModernSearch: React.FC<ModernSearchProps> = ({ onFilterChange, currentFilter }) => {
  const [pgRatings, setPgRatings] = useState<PgRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<PgRating | null>(null);

  useEffect(() => {
    const loadPgRatings = async () => {
      try {
        const ratings = await fetchPgRatings();
        setPgRatings([{ id: 0, code: 'ALL', name: 'All Movies', description: '' }, ...ratings]);
        
        if (currentFilter) {
          const current = ratings.find(r => r.id === currentFilter);
          setSelectedRating(current || null);
        } else {
          setSelectedRating({ id: 0, code: 'ALL', name: 'All Movies', description: '' });
        }
      } catch (error) {
        console.error('Error fetching PG ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPgRatings();
  }, [currentFilter]);

  const filteredRatings = query === ''
    ? pgRatings
    : pgRatings.filter((rating) =>
        rating.name.toLowerCase().includes(query.toLowerCase()) ||
        rating.code.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectionChange = (rating: PgRating) => {
    setSelectedRating(rating);
    onFilterChange(rating.id === 0 ? undefined : rating.id);
  };

  if (loading) {
    return (
      <div className="w-full max-w-md">
        <Loader size="sm" text="Loading filters..." />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md relative">
      <Combobox value={selectedRating} onChange={handleSelectionChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="flex items-center px-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
              <Combobox.Input
                className="w-full border-none py-4 pl-0 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none placeholder-gray-400"
                displayValue={(rating: PgRating) => rating?.name || ''}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search or filter movies by rating..."
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
          </div>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredRatings.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredRatings.map((rating) => (
                  <Combobox.Option
                    key={rating.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-3 pl-10 pr-4 transition-colors ${
                        active ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={rating}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          <span className="font-semibold">{rating.code}</span>
                          {rating.code !== 'ALL' && (
                            <span className="ml-2 text-sm opacity-75">- {rating.name}</span>
                          )}
                          {rating.code === 'ALL' && (
                            <span className="ml-2 text-sm opacity-75">Show all movies</span>
                          )}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-blue-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ModernSearch;
