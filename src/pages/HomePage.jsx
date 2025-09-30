import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import { fetchWeather } from '../features/weather/weatherSlice';
import { addSavedCity } from '../features/cities/citiesSlice';
import { showSuccess, showError } from '../utils/toast';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const username = useSelector((state) => state.user.username);
  const savedCities = useSelector((state) => state.cities.savedCities);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  const [mainCity, setMainCity] = useState('Istanbul');
  const [previewCities, setPreviewCities] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Show error toast
  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  // Initialize mainCity on first load
  useEffect(() => {
    if (hasInitialized) return;

    let initialCity = savedCities.length
      ? savedCities[Math.floor(Math.random() * savedCities.length)]
      : 'Istanbul';

    setMainCity(location.state?.city || initialCity);
    setHasInitialized(true);
  }, [hasInitialized, savedCities, location.state]);

  // Update mainCity if location state changes
  useEffect(() => {
    if (location.state?.city && location.state.city !== mainCity) {
      setMainCity(location.state.city);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.city, mainCity, navigate, location.pathname]);

  // Set preview cities
  useEffect(() => {
    const others = savedCities
      .filter((c) => c !== mainCity)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setPreviewCities(others);
  }, [savedCities, mainCity]);

  // Fetch weather for main city
  useEffect(() => {
    if (mainCity && !weatherData[mainCity]) {
      dispatch(fetchWeather(mainCity));
    }
  }, [mainCity, weatherData, dispatch]);

  // Fetch weather for preview cities
  useEffect(() => {
    previewCities.forEach((city) => {
      if (!weatherData[city]) dispatch(fetchWeather(city));
    });
  }, [previewCities, weatherData, dispatch]);

  // Handlers
  const handleSearchAdd = useCallback(
    (city) => {
      const normalizedCity =
        city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      setMainCity(normalizedCity);
      dispatch(fetchWeather(normalizedCity));
    },
    [dispatch]
  );

  const handleCityClick = useCallback(
    (city) => {
      setMainCity(city);
      dispatch(fetchWeather(city));
    },
    [dispatch]
  );

  const handleSaveCity = useCallback(() => {
    dispatch(addSavedCity(mainCity));
    showSuccess(`${mainCity} saved!`);
  }, [dispatch, mainCity]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {username ? `Hello, ${username}!` : 'Welcome!'}
      </h1>

      <SearchBar onSearch={handleSearchAdd} />

      {loading && (
        <p className="text-center text-gray-500 dark:text-white mt-4">
          Loading...
        </p>
      )}

      {!loading && mainCity && weatherData[mainCity] && (
        <motion.div
          key={mainCity}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-2xl backdrop-blur-sm"
        >
          <WeatherDisplay data={weatherData[mainCity]} compact={false} />
          <div className="flex justify-center mt-4">
            {!savedCities.includes(mainCity) && (
              <button
                onClick={handleSaveCity}
                className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
              >
                Save City
              </button>
            )}
          </div>
        </motion.div>
      )}

      {previewCities.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="col-span-full text-xl font-semibold mb-2">
            Saved Previews
          </h2>
          {previewCities.map(
            (city, index) =>
              weatherData[city] && (
                <motion.div
                  key={city}
                  className="cursor-pointer p-4 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-lg hover:shadow-xl backdrop-blur-sm transition"
                  onClick={() => handleCityClick(city)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WeatherDisplay data={weatherData[city]} compact={true} />
                </motion.div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
