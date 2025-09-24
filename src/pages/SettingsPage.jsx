import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setTheme } from '../features/user/userSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const theme = useSelector((state) => state.user.theme);

  const [newUsername, setNewUsername] = useState(username);

  const handleUsernameChange = () => {
    dispatch(setUsername(newUsername));
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="mb-4">
        <label className="block mb-1">Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleUsernameChange}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      <div className="mb-4">
        <p>Theme: {theme}</p>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
