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
    <div className="w-screen h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex flex-col items-center pt-10 text-white">
      <h1 className="text-4xl font-bold mb-8">SkySight</h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
};

export default App;
