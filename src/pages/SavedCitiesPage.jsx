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

  // Handle click → navigate to homepage with selected city
  const handleCityClick = (city) => {
    navigate('/', { state: { city } });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Cities</h1>

      {/* Search bar */}
      {savedCities.length > 0 && (
        <input
          type="text"
          placeholder="Search saved cities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {/* Empty state */}
      {savedCities.length === 0 ? (
        <div className="flex flex-col items-center mt-20 text-gray-400">
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
                className="relative p-5 bg-blue-600/20 rounded-2xl shadow-md hover:shadow-lg cursor-pointer hover:bg-blue-600/30 transition"
                onClick={() => handleCityClick(city)}
              >
                <h2 className="text-xl font-semibold">{city}</h2>

                {/* Remove button (stop click bubbling so it doesn’t navigate) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeSavedCity(city));
                  }}
                  className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ✕
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
