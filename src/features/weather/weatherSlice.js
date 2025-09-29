import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Async thunk to fetch both current + forecast
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const currentData = await currentRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    // Filter forecast → one entry per day (around 12:00)
    const daily = forecastData.list.filter((item) =>
      item.dt_txt.includes('12:00:00')
    );

    return {
      current: currentData.main
        ? {
            temp: currentData.main.temp,
            weather: currentData.weather,
          }
        : null,
      location: {
        name: currentData.name,
        country: currentData.sys?.country,
      },
      daily,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {},
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
        if (action.payload && action.payload.location?.name) {
          const cityName = action.payload.location.name;
          state.weatherData[cityName] = action.payload;
        }
        state.error = null;
      })

      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = 'City not found';
      });
  },
});

export default weatherSlice.reducer;
