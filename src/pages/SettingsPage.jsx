import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '../features/user/userSlice';
import ThemeToggle from '../components/ThemeToggle';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const [newUsername, setNewUsername] = useState(username || '');

  const handleUsernameSave = () => {
    if (newUsername.trim() !== '') {
      dispatch(setUsername(newUsername.trim()));
      alert('Username updated!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Username Section */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          placeholder="Enter username"
        />
        <button
          onClick={handleUsernameSave}
          className="mt-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {/* Theme Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Theme</h2>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SettingsPage;
