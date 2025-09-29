import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="flex gap-2 mb-6 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Enter city"
        className="flex-1 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
