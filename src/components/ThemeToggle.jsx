import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../features/user/userSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  const isDark = theme === 'dark';

  const handleToggle = () => {
    dispatch(setTheme(isDark ? 'light' : 'dark'));
  };
  return (
    <div className="flex items-center space-x-3">
      <span
        className={`text-sm font-semibold ${
          isDark ? 'text-gray-500' : 'text-yellow-500'
        }`}
      >
        ☀️ Light
      </span>

      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
          isDark ? 'bg-gray-700' : 'bg-blue-400'
        }`}
      >
        <span className="sr-only">Toggle theme</span>

        <span
          className={`
            inline-block w-4 h-4 transform rounded-full transition-transform duration-300
            ${isDark ? 'translate-x-6 bg-yellow-400' : 'translate-x-1 bg-white'}
          `}
        ></span>
      </button>
      <span
        className={`text-sm font-semibold ${
          isDark ? 'text-purple-400' : 'text-gray-500'
        }`}
      >
        🌙 Dark
      </span>
    </div>
  );
};

export default ThemeToggle;
