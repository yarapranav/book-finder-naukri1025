import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookFavorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.key === book.key)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFavorite = (bookKey) => {
    setFavorites((prev) => prev.filter((book) => book.key !== bookKey));
  };

  const isFavorite = (bookKey) => {
    return favorites.some((book) => book.key === bookKey);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
