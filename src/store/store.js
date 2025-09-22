import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import citiesReducer from '../features/cities/citiesSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cities: citiesReducer,
    weather: weatherReducer,
  },
});
