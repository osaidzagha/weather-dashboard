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
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="border p-2 rounded flex-1"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
