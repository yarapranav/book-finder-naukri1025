import React, { useState, useEffect } from 'react';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useBookSearch } from './hooks/useBookSearch';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetail from './components/BookDetail';
import LoadingSkeleton from './components/LoadingSkeleton';
import FavoritesList from './components/FavoritesList';
import toast, { Toaster } from 'react-hot-toast';

function AppContent() {
  const { darkMode } = useTheme();
  const { books, loading, error, hasMore, totalResults, search, loadMore, reset } = useBookSearch();
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSearchType, setCurrentSearchType] = useState('title');
  const [showFavorites, setShowFavorites] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleAddFavorite = (book) => {
    addFavorite(book);
    toast.success(`Added "${book.title}" to favorites!`);
  };
  const handleRemoveFavorite = (bookKey, bookTitle) => {
    removeFavorite(bookKey);
    toast(`Removed "${bookTitle}" from favorites`, { icon: '🗑️' });
  };

  const handleSearch = (query, searchType) => {
    setCurrentQuery(query);
    setCurrentSearchType(searchType);
    setShowFavorites(false);
    search(query, searchType, 1);
  };

  const handleLoadMore = () => loadMore(currentQuery, currentSearchType);

  const handleShowFavorites = () => {
    setShowFavorites(true);
    reset();
  };
  const handleShowSearch = () => setShowFavorites(false);

  useEffect(() => {
    if (books.length > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuery]);
  useEffect(() => {
    if (!loading && books.length > 20) window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [books, loading]);
  useEffect(() => { if (error) toast.error(error); }, [error]);

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col transition-colors duration-500`}>
      <Navbar onShowSearch={handleShowSearch} onShowFavorites={handleShowFavorites} showFavorites={showFavorites} />
      <Toaster position="top-right" />

      {/* Main content should fill all space except navbar/footer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-36 flex-1">
        {!showFavorites && (
          <>
            <SearchBar onSearch={handleSearch} loading={loading} />
            {totalResults > 0 && <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Found {totalResults.toLocaleString()} results</p>}
            {books.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onClick={setSelectedBook}
                    addFavorite={() => handleAddFavorite(book)}
                    removeFavorite={() => handleRemoveFavorite(book.key, book.title)}
                    isFavorite={isFavorite(book.key)}
                  />
                ))}
              </div>
            )}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 8 }).map((_, index) => (<LoadingSkeleton key={index} />))}
              </div>
            )}
            {!loading && books.length === 0 && currentQuery && !error && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">No books found. Try a different search term.</p>
              </div>
            )}
            {!loading && books.length === 0 && !currentQuery && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Start searching for books by title, author, subject, or ISBN!
                </p>
              </div>
            )}
            {hasMore && !loading && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Load More Books
                </button>
              </div>
            )}
          </>
        )}
        {showFavorites && (
          <FavoritesList
            onBookClick={setSelectedBook}
            removeFavorite={handleRemoveFavorite}
            addFavorite={handleAddFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>
      {selectedBook && (
        <BookDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          addFavorite={() => handleAddFavorite(selectedBook)}
          removeFavorite={() => handleRemoveFavorite(selectedBook.key, selectedBook.title)}
          isFavorite={isFavorite(selectedBook.key)}
        />
      )}
      <footer className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} bg-white dark:bg-gray-800 border-t transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          Built with React & Open Library API | Candidate ID: Naukri1025
        </div>
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
