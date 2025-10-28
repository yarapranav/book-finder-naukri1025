const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, searchType = 'title', page = 1) => {
  try {
    const limit = 20;
    const offset = (page - 1) * limit;
    
    let searchParam;
    switch (searchType) {
      case 'author':
        searchParam = `author=${encodeURIComponent(query)}`;
        break;
      case 'isbn':
        searchParam = `isbn=${encodeURIComponent(query)}`;
        break;
      case 'subject':
        searchParam = `subject=${encodeURIComponent(query)}`;
        break;
      default:
        searchParam = `title=${encodeURIComponent(query)}`;
    }

    const url = `${BASE_URL}/search.json?${searchParam}&limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return {
      books: data.docs || [],
      totalResults: data.numFound || 0,
      hasMore: data.numFound > offset + limit
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getBookDetails = async (key) => {
  try {
    const response = await fetch(`${BASE_URL}${key}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};
