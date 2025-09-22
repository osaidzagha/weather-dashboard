import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import { fetchWeather } from '../features/weather/weatherSlice';
import { addSavedCity } from '../features/cities/citiesSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const savedCities = useSelector((state) => state.cities.savedCities);
  const weatherData = useSelector((state) => state.weather.weatherData);

  const [mainCity, setMainCity] = useState(null);
  const [previewCities, setPreviewCities] = useState([]);

  // Pick main city & 3 random previews
  useEffect(() => {
    if (savedCities.length > 0) {
      const main = savedCities[Math.floor(Math.random() * savedCities.length)];
      setMainCity(main);

      const others = savedCities
        .filter((c) => c !== main)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setPreviewCities(others);
    } else {
      const defaultCity = 'Istanbul';
      setMainCity(defaultCity);
      setPreviewCities([]);
    }
  }, [savedCities]);

  // Fetch main city weather if not available
  useEffect(() => {
    if (mainCity && !weatherData[mainCity]) {
      dispatch(fetchWeather(mainCity));
    }
  }, [mainCity, weatherData, dispatch]);

  // Fetch preview cities weather if not available
  useEffect(() => {
    previewCities.forEach((city) => {
      if (!weatherData[city]) dispatch(fetchWeather(city));
    });
  }, [previewCities, weatherData, dispatch]);

  // Handle city search & add
  const handleSearchAdd = (city) => {
    const normalizedCity =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    if (!savedCities.includes(normalizedCity)) {
      dispatch(addSavedCity(normalizedCity));
      dispatch(fetchWeather(normalizedCity));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {username ? `Hello, ${username}!` : 'Welcome!'}
      </h1>

      {/* SearchBar */}
      <SearchBar onSearch={handleSearchAdd} />

      {/* Main City Detailed Display */}
      {mainCity && weatherData[mainCity] && (
        <WeatherDisplay data={weatherData[mainCity]} compact={false} />
      )}

      {/* 3 Random Preview Cities */}
      {previewCities.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {previewCities.map(
            (city) =>
              weatherData[city] && (
                <WeatherDisplay
                  key={city}
                  data={weatherData[city]}
                  compact={true}
                />
              )
          )}
        </div>
      ) : (
        <p className="mt-8 text-gray-500 text-center">
          Add more cities to see previews.
        </p>
      )}
    </div>
  );
};

export default HomePage;
