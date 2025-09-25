import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedCity } from '../features/cities/citiesSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SavedCitiesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedCities = useSelector((state) => state.cities.savedCities);

  const [search, setSearch] = useState('');

  const filteredCities = savedCities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleCityClick = (city) => {
    navigate('/', { state: { city: city } });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Cities</h1>

      {savedCities.length > 0 && (
        <input
          type="text"
          placeholder="Search saved cities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg shadow-sm 
                     bg-white dark:bg-gray-700 
                     border-gray-300 dark:border-gray-600
                     text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      )}

      {savedCities.length === 0 ? (
        <div className="flex flex-col items-center mt-20 text-gray-500 dark:text-gray-400">
          <span className="text-6xl mb-4">🌍</span>
          <p>No saved cities yet. Add one from the homepage!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCities.map((city) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative p-5 rounded-2xl shadow-xl cursor-pointer transition
                           bg-gray-100 dark:bg-gray-800
                           hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => handleCityClick(city)}
              >
                <h2 className="text-xl font-semibold">{city}</h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeSavedCity(city));
                  }}
                  className="absolute top-3 right-3 p-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SavedCitiesPage;
