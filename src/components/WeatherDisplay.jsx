import { useSelector } from 'react-redux';

const WeatherDisplay = () => {
  const { current, daily, loading, error } = useSelector(
    (state) => state.weather
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!current) return null;
  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temp: {current.temp}°C</p>
      <p>Weather: {current.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      <ul>
        {daily.map((day, index) => (
          <li key={index}>
            {new Date(day.dt * 1000).toLocaleDateString()}: {day.temp.day}°C,{' '}
            {day.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
