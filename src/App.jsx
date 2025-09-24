import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SavedCitiesPage from './pages/SavedCitiesPage';
import { useSelector } from 'react-redux';

const App = () => {
  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 p-6">
        <nav className="flex justify-center gap-4 mb-6">
          <Link className="text-white font-bold" to="/">
            Home
          </Link>
          <Link className="text-white font-bold" to="/saved-cities">
            Saved Cities
          </Link>
          <Link className="text-white font-bold" to="/settings">
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
