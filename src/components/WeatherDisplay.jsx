import { useSelector } from 'react-redux';

const WeatherDisplay = () => {
  const { current, daily, loading, error } = useSelector(
    (state) => state.weather
  );

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!current) return null;

  const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-start pt-20 px-4">
      {/* Current Weather */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold">{current.temp.toFixed(1)}°C</h1>
        <p className="text-2xl capitalize">{current.weather[0].description}</p>
        <img
          src={getIcon(current.weather[0].icon)}
          alt={current.weather[0].description}
          className="mx-auto mt-4"
        />
      </div>

      {/* 5-Day Forecast */}
      <div className="w-full flex justify-between max-w-6xl">
        {daily.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-medium mb-2">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </p>
            <img
              src={getIcon(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="w-24 h-24"
            />
            <p className="font-bold mt-2">{day.temp.day.toFixed(1)}°C</p>
            <p className="capitalize text-sm">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
