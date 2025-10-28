import React from 'react';
import BookCard from './BookCard';

const FavoritesList = ({ onBookClick, addFavorite, removeFavorite, isFavorite }) => {
  const favorites = JSON.parse(localStorage.getItem('bookFavorites')) || [];

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          No favorites yet. Start adding books you love! ❤️
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        My Favorites ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onClick={onBookClick}
            addFavorite={() => addFavorite(book)}
            removeFavorite={() => removeFavorite(book.key, book.title)}
            isFavorite={isFavorite(book.key)}
          />
        ))}
      </div>
    </div>
  );
};
export default FavoritesList;
