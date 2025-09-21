import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeather(city));
      setCity('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="flex-1 p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
