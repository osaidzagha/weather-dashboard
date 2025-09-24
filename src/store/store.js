import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import citiesReducer from '../features/cities/citiesSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cities: citiesReducer,
    user: userReducer,
  },
});
