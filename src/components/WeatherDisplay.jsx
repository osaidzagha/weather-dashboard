import { useDispatch, useSelector } from 'react-redux';
import { addSavedCity } from '../features/cities/citiesSlice';

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const { current, daily, location, loading, error } = useSelector(
    (state) => state.weather
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!current) return null;

  const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="text-center text-white">
      <h2 className="text-2xl font-bold mb-2">
        {location?.name}, {location?.country}
      </h2>
      <button
        onClick={() => dispatch(addSavedCity(location?.name))}
        className="mb-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
      >
        Save City
      </button>

      {/* Current Weather */}
      <h1 className="text-5xl font-bold">{current.temp.toFixed(1)}°C</h1>
      <p className="text-xl">{current.weather[0].description}</p>
      <img
        src={getIcon(current.weather[0].icon)}
        alt="icon"
        className="mx-auto"
      />

      {/* Forecast */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {daily.map((day, i) => (
          <div key={i} className="bg-white/10 p-3 rounded-lg w-28">
            <p>
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </p>
            <img src={getIcon(day.weather[0].icon)} alt="forecast" />
            <p>{day.main.temp.toFixed(1)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
