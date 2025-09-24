import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../features/user/userSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  const handleToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white transition-colors duration-300"
    >
      {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;
