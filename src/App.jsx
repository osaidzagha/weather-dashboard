import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 p-6">
      <h1 className="text-4xl text-center font-bold text-white mb-8">
        Simple Weather App
      </h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
};

export default App;
