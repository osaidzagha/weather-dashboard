import React from 'react';

const ForecastChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="w-full flex justify-between max-w-6xl flex-wrap gap-4 mt-4">
      {forecast.map((day) => (
        <div
          key={day.dt}
          className="flex flex-col items-center bg-gray-800 dark:bg-gray-700 p-4 rounded-lg w-28 md:w-32"
        >
          <p className="font-medium mb-2 text-center">
            {new Date(day.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
            })}
          </p>
          <img
            src={getIcon(day.weather[0].icon)}
            alt={day.weather[0].description}
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <p className="font-bold mt-2">{day.temp.day.toFixed(1)}°C</p>
          <p className="capitalize text-sm text-center">
            {day.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastChart;
