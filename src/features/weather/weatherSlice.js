import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch weather for a city
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    // 1️⃣ Get latitude & longitude
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await axios.get(geoUrl);
    if (!geoResponse.data.length) throw new Error('City not found');

    const { lat, lon, name, country } = geoResponse.data[0];

    // 2️⃣ Get weather data
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`;
    const weatherResponse = await axios.get(weatherUrl);

    return {
      location: { name, country },
      current: weatherResponse.data.current,
      daily: weatherResponse.data.daily.slice(0, 5),
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {}, // { cityName: { current, daily, location } }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const cityName = action.payload.location.name;
        state.weatherData[cityName] = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather';
      });
  },
});

export default weatherSlice.reducer;
