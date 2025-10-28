import { useState, useCallback } from 'react';
import { searchBooks } from '../utils/api';

export const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const search = useCallback(async (query, searchType = 'title', page = 1) => {
    if (!query.trim()) {
      setBooks([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchBooks(query, searchType, page);
      
      if (page === 1) {
        setBooks(result.books);
      } else {
        setBooks((prev) => [...prev, ...result.books]);
      }
      
      setHasMore(result.hasMore);
      setTotalResults(result.totalResults);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback((query, searchType) => {
    search(query, searchType, currentPage + 1);
  }, [search, currentPage]);

  const reset = useCallback(() => {
    setBooks([]);
    setError(null);
    setHasMore(false);
    setTotalResults(0);
    setCurrentPage(1);
  }, []);

  return {
    books,
    loading,
    error,
    hasMore,
    totalResults,
    search,
    loadMore,
    reset
  };
};
