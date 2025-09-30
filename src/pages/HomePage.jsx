import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import {
  fetchWeather,
  clearWeatherError,
} from '../features/weather/weatherSlice';
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

  const DEFAULT_CITY = 'istanbul';
  const [mainCity, setMainCity] = useState(DEFAULT_CITY);

  const [previewCities, setPreviewCities] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const setNormalizedMainCity = useCallback((city) => {
    setMainCity(city.trim().toLowerCase());
  }, []);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  useEffect(() => {
    if (hasInitialized) return;

    const navCity = location.state?.city;
    let cityToSet = DEFAULT_CITY;

    if (navCity) {
      cityToSet = navCity;
    } else if (savedCities.length > 0) {
      cityToSet = savedCities[Math.floor(Math.random() * savedCities.length)];
    }

    if (cityToSet.toLowerCase() !== mainCity) {
      setNormalizedMainCity(cityToSet);
    }

    setHasInitialized(true);

    if (navCity) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [hasInitialized]);

  useEffect(() => {
    if (!mainCity) return;

    const others = savedCities
      .filter((c) => c.toLowerCase() !== mainCity.toLowerCase())
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setPreviewCities(others);
  }, [savedCities, mainCity]);

  useEffect(() => {
    if (mainCity) {
      const cityKey = mainCity.toLowerCase();
      if (weatherData[cityKey] === undefined) {
        dispatch(fetchWeather({ city: cityKey, skipForecast: false }));
      }
    }
  }, [mainCity, weatherData, dispatch]);

  useEffect(() => {
    previewCities.forEach((city) => {
      const cityKey = city.toLowerCase();
      if (weatherData[cityKey] === undefined) {
        dispatch(fetchWeather({ city: cityKey, skipForecast: true }));
      }
    });
  }, [previewCities, weatherData, dispatch]);

  // Handlers
  const handleSearchAdd = useCallback(
    (city) => {
      setNormalizedMainCity(city);
      dispatch(clearWeatherError());
    },
    [dispatch, setNormalizedMainCity]
  );

  const handleCityClick = useCallback(
    (city) => {
      setMainCity(city.toLowerCase());
      dispatch(clearWeatherError());
    },
    [dispatch]
  );

  const handleSaveCity = useCallback(() => {
    const cityToSave =
      weatherData[mainCity.toLowerCase()]?.location?.name || mainCity;
    dispatch(addSavedCity(cityToSave));
    showSuccess(`${cityToSave} saved!`);
  }, [dispatch, mainCity, weatherData]);

  const cityKey = mainCity.toLowerCase();
  const currentWeatherData = weatherData[cityKey];

  const hasFailedToLoad = currentWeatherData?.error === true;
  const isMainCityDataValid = currentWeatherData && !hasFailedToLoad;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {username ? `Hello, ${username}!` : 'Welcome!'}
      </h1>

      <SearchBar onSearch={handleSearchAdd} />

      {loading && (
        <p className="text-center text-gray-500 dark:text-white mt-4">
          Loading {mainCity}...
        </p>
      )}

      {!loading && mainCity && hasFailedToLoad && (
        <p className="text-center text-red-500 dark:text-red-400 mt-6">
          Could not load weather for **{mainCity}**. Please try a different
          city.
        </p>
      )}

      {/* 3. Main City Display */}
      {!loading && mainCity && isMainCityDataValid && (
        <motion.div
          key={cityKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 shadow-2xl backdrop-blur-sm"
        >
          <WeatherDisplay data={currentWeatherData} compact={false} />
          <div className="flex justify-center mt-4">
            {!savedCities.includes(currentWeatherData.location.name) && (
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

      {/* Preview Cities Display */}
      {previewCities.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="col-span-full text-xl font-semibold mb-2">
            Saved Previews
          </h2>
          {previewCities.map((city) => {
            const previewKey = city.toLowerCase();
            const previewData = weatherData[previewKey];

            if (previewData && !previewData.error) {
              return (
                <motion.div
                  key={city}
                  className="cursor-pointer p-4 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-lg hover:shadow-xl backdrop-blur-sm transition"
                  onClick={() => handleCityClick(city)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WeatherDisplay data={previewData} compact={true} />
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
