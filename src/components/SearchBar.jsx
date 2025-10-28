import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                bg-sky-100 dark:bg-sky-800 text-gray-900 dark:text-sky-100 placeholder-gray-500 dark:placeholder-sky-300"
              disabled={loading}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-sky-300 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Title", value: "title" },
            { label: "Author", value: "author" },
            { label: "Subject", value: "subject" },
            { label: "ISBN", value: "isbn" }
          ].map(opt => (
            <label key={opt.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={opt.value}
                checked={searchType === opt.value}
                onChange={e => setSearchType(e.target.value)}
                className="mr-2 accent-blue-600 dark:accent-sky-400"
              />
              <span className="font-bold text-blue-900 dark:text-sky-300">{opt.label}</span>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
