import React from 'react';
import { useDispatch } from 'react-redux';
import { addSavedCity } from '../features/cities/citiesSlice';
import ForecastChart from './ForecastChart';

const WeatherDisplay = ({ data, compact = false }) => {
  const dispatch = useDispatch();
  if (!data) return null;

  const { current, daily, location } = data;

  const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div
      className={`flex flex-col items-center justify-start p-4 rounded-xl shadow-md ${
        compact ? 'bg-gray-800 w-60' : 'bg-gray-900 w-full min-h-screen'
      } text-white`}
    >
      {/* City + Save button */}
      <div className="text-center mb-4">
        <h2 className={`text-xl font-semibold ${compact ? '' : 'text-3xl'}`}>
          {location?.name}, {location?.country}
        </h2>
        {!compact && (
          <button
            onClick={() => dispatch(addSavedCity(location?.name))}
            className="mt-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          >
            Save City
          </button>
        )}
      </div>

      {/* Current Weather */}
      <div className="text-center mb-4">
        <h1 className={`font-bold ${compact ? 'text-2xl' : 'text-6xl'}`}>
          {current.temp.toFixed(1)}°C
        </h1>
        <p className={`capitalize ${compact ? 'text-sm' : 'text-2xl'}`}>
          {current.weather[0].description}
        </p>
        <img
          src={getIcon(current.weather[0].icon)}
          alt={current.weather[0].description}
          className={`mx-auto ${compact ? 'w-16 h-16' : 'w-32 h-32'}`}
        />
      </div>

      {/* 5-Day Forecast */}
      {!compact && daily && <ForecastChart forecast={daily} />}
    </div>
  );
};

export default WeatherDisplay;
