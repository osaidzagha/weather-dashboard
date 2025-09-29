import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import citiesReducer from '../features/cities/citiesSlice';
import userReducer from '../features/user/userSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cities: citiesReducer,
    user: userReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState({
    user: store.getState().user,
    cities: store.getState().cities,
  });
});
