import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedCity } from '../features/cities/citiesSlice';

const SavedCitiesPage = () => {
  const dispatch = useDispatch();
  const savedCities = useSelector((state) => state.cities.savedCities);

  if (savedCities.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">No saved cities yet.</p>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Saved Cities</h1>
      <ul className="space-y-3">
        {savedCities.map((city) => (
          <li
            key={city}
            className="flex justify-between items-center p-3 bg-blue-700/20 rounded"
          >
            <span>{city}</span>
            <button
              onClick={() => dispatch(removeSavedCity(city))}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCitiesPage;
