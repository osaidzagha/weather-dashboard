import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, skipForecast = false }, { rejectWithValue }) => {
    let currentData;
    let daily = [];

    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      currentData = await currentRes.json();

      if (!currentRes.ok) {
        return rejectWithValue({
          city,
          message: currentData.message || 'City not found',
        });
      }
    } catch (networkError) {
      return rejectWithValue({
        city,
        message:
          networkError.message || 'Network error fetching current weather.',
      });
    }

    if (!skipForecast) {
      try {
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          daily = forecastData.list.filter((item) =>
            item.dt_txt.includes('12:00:00')
          );
        } else {
          const errorText = await forecastRes.text();
          console.warn(
            `Forecast failed (Status ${forecastRes.status}) for ${currentData.name}: ${errorText}`
          );
        }
      } catch (error) {
        console.warn(
          `Forecast network or parsing error for ${currentData.name}: ${error.message}`
        );
      }
    }

    return {
      current: {
        temp: currentData.main.temp,
        weather: currentData.weather,
      },
      location: {
        name: currentData.name,
        country: currentData.sys?.country,
      },
      inputCity: city,
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
  reducers: {
    clearWeatherError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const key = action.payload.inputCity;
        state.weatherData[key] = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        const { city: rejectedCity, message } = action.payload || {};

        if (rejectedCity) {
          state.weatherData[rejectedCity] = { error: true };
        }
        state.error = message || 'City not found';
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
