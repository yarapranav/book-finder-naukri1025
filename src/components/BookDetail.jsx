import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCoverUrl } from '../utils/api';

const BookDetail = ({ book, onClose, addFavorite, removeFavorite, isFavorite }) => {
  const favorite = isFavorite;

  const coverUrl = book.cover_i
    ? getCoverUrl(book.cover_i, 'L')
    : 'https://via.placeholder.com/200x300?text=No+Cover';

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-sky-100 dark:bg-sky-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="sticky top-0 bg-sky-100 dark:bg-sky-900 border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book Details</h2>
              <button
                onClick={onClose}
                className="text-gray-600 dark:text-sky-100 hover:text-gray-900 dark:hover:text-white text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full md:w-64 rounded-lg shadow-lg bg-sky-50 dark:bg-sky-800"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                    }}
                  />
                  <button
                    onClick={handleFavoriteClick}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-bold"
                  >
                    {favorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                  </button>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{book.title}</h1>

                  {book.author_name && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 dark:text-sky-200">Author(s):</h3>
                      <p className="text-gray-600 dark:text-sky-100">{book.author_name.join(', ')}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {book.first_publish_year && (
                      <div>
                        <h3 className="font-semibold text-gray-700 dark:text-sky-200">First Published:</h3>
                        <p className="text-gray-600 dark:text-sky-100">{book.first_publish_year}</p>
                      </div>
                    )}

                    {book.number_of_pages_median && (
                      <div>
                        <h3 className="font-semibold text-gray-700 dark:text-sky-200">Pages:</h3>
                        <p className="text-gray-600 dark:text-sky-100">{book.number_of_pages_median}</p>
                      </div>
                    )}

                    {book.language && (
                      <div>
                        <h3 className="font-semibold text-gray-700 dark:text-sky-200">Languages:</h3>
                        <p className="text-gray-600 dark:text-sky-100">{book.language.slice(0, 3).join(', ')}</p>
                      </div>
                    )}

                    {book.publisher && (
                      <div>
                        <h3 className="font-semibold text-gray-700 dark:text-sky-200">Publishers:</h3>
                        <p className="text-gray-600 dark:text-sky-100 line-clamp-2">
                          {book.publisher.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {book.isbn && book.isbn.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 dark:text-sky-200">ISBN:</h3>
                      <p className="text-gray-600 dark:text-sky-100">{book.isbn[0]}</p>
                    </div>
                  )}

                  {book.subject && book.subject.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 dark:text-sky-200 mb-2">Subjects:</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.subject.slice(0, 10).map((subject, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {book.first_sentence && book.first_sentence.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 dark:text-sky-200">First Sentence:</h3>
                      <p className="text-gray-600 dark:text-sky-100 italic">"{book.first_sentence[0]}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookDetail;
