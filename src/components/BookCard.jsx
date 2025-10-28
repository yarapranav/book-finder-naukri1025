import React from 'react';
import { motion } from 'framer-motion';
import { getCoverUrl } from '../utils/api';

const BookCard = ({ book, onClick, addFavorite, removeFavorite, isFavorite }) => {
  const favorite = isFavorite;
  const coverUrl = book.cover_i 
    ? getCoverUrl(book.cover_i, 'M')
    : 'https://via.placeholder.com/128x193?text=No+Cover';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <motion.div
      onClick={() => onClick(book)}
      className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59,130,246,0.2)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      layout
    >
      <div className="relative">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover bg-sky-50 dark:bg-sky-800"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128x193?text=No+Cover';
          }}
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white dark:bg-sky-700 rounded-full p-2 shadow-lg hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <motion.span
            className="text-2xl"
            key={favorite ? 'filled' : 'empty'}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            {favorite ? '❤️' : '🤍'}
          </motion.span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem] text-gray-900 dark:text-white">{book.title}</h3>
        {book.author_name && (
          <p className="text-gray-700 dark:text-sky-100 text-sm mb-2 line-clamp-1">
            by {book.author_name.join(', ')}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-sky-200">
          {book.first_publish_year && (
            <span className="bg-gray-100 dark:bg-sky-700 text-gray-700 dark:text-sky-200 px-2 py-1 rounded">
              {book.first_publish_year}
            </span>
          )}
          {book.number_of_pages_median && (
            <span className="bg-gray-100 dark:bg-sky-700 text-gray-700 dark:text-sky-200 px-2 py-1 rounded">
              {book.number_of_pages_median} pages
            </span>
          )}
        </div>
        {book.subject && book.subject.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 dark:text-sky-200 line-clamp-2">
              {book.subject.slice(0, 3).join(', ')}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default BookCard;
