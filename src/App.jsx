import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
}

export default App;
