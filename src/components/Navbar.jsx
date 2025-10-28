import React from 'react';
import { useTheme } from '../context/ThemeContext';

// No max-w and with glass transparency+blur effect
function Navbar({ onShowSearch, onShowFavorites, showFavorites }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95vw] z-50">
      <div className="
        flex items-center justify-between
        bg-white/40 dark:bg-gray-900/80 shadow-xl
        border border-gray-300 dark:border-gray-900
        backdrop-blur-xl rounded-2xl px-8 py-4
      ">
        <div className="flex items-center gap-4">
          <button
            onClick={onShowSearch}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              !showFavorites
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-sky-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >Search</button>
          <button
            onClick={onShowFavorites}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              showFavorites
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-sky-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >❤️ Favorites</button>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-gray-900 dark:text-sky-100">Book Finder</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
            className="ml-2 text-xl dark:text-white"
          >{darkMode ? '🌞' : '🌙'}</button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
