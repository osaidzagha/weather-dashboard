import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SavedCitiesPage from './pages/SavedCitiesPage';
import { useSelector } from 'react-redux';

const App = () => {
  const theme = useSelector((state) => state.user.theme);

  const appContainerClasses = `
    min-h-screen p-6 
    bg-gradient-to-b from-blue-200 to-blue-50 
    dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 
    text-gray-800 dark:text-white
    transition-colors duration-300
    ${theme === 'dark' ? 'dark' : ''} 
  `;

  return (
    <Router>
      <div className={appContainerClasses.trim()}>
        <nav className="flex justify-center gap-4 mb-6">
          <Link className="font-bold text-black dark:text-white" to="/">
            Home
          </Link>
          <Link
            className="font-bold text-black dark:text-white"
            to="/saved-cities"
          >
            Saved Cities
          </Link>
          <Link className="font-bold text-black dark:text-white" to="/settings">
            Settings
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved-cities" element={<SavedCitiesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
