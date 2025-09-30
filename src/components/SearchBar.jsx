import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city.trim());
      setCity('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 w-full max-w-xl mx-auto">
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setIsValid(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter city"
          className={`
                  flex-1 p-3 rounded-lg border shadow-md focus:outline-none focus:ring-2 
                  ${
                    isValid
                      ? 'border-gray-300 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                      : 'border-red-500 focus:ring-red-400 dark:border-red-500'
                  }
                `}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
      {!isValid && (
        <p className="w-full mt-1 text-sm text-red-500 dark:text-red-400 text-left">
          Please enter a city name.
        </p>
      )}
    </div>
  );
};

export default SearchBar;
