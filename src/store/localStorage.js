export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('weather-app-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from local storage:', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('weather-app-state', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage:', err);
  }
};
