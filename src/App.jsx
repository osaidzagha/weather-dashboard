import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeather } from './features/weatherSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    dispatch(fetchWeather(randomCity));
  }, [dispatch]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center text-white">
      <div className="mt-8 w-full max-w-4xl px-4">
        <SearchBar />
      </div>
      <WeatherDisplay />
    </div>
  );
};

export default App;
