import { createSlice } from '@reduxjs/toolkit';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    savedCities: [],
  },
  reducers: {
    addSavedCity: (state, action) => {
      if (!state.savedCities.includes(action.payload)) {
        state.savedCities.push(action.payload);
      }
    },
    removeSavedCity: (state, action) => {
      state.savedCities = state.savedCities.filter(
        (city) => city !== action.payload
      );
    },
  },
});

export const { addSavedCity, removeSavedCity } = citiesSlice.actions;
export default citiesSlice.reducer;
