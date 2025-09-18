import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    // 1️⃣ Get latitude & longitude
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await axios.get(geoUrl);
    if (!geoResponse.data.length) throw new Error('City not found');

    const { lat, lon } = geoResponse.data[0];

    // 2️⃣ Get weather data
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`;
    const weatherResponse = await axios.get(weatherUrl);

    // 3️⃣ Log the response for debugging
    console.log(weatherResponse.data);

    return {
      current: weatherResponse.data.current,
      daily: weatherResponse.data.daily.slice(0, 5), // first 5 days
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    daily: [],
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
        state.loading = false;
        state.current = action.payload.current;
        state.daily = action.payload.daily;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather';
      });
  },
});

export default weatherSlice.reducer;
