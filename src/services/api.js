export const fetchMovies = async (endpoint) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  // Verify API key exists
  if (!API_KEY) {
    console.error("API Key missing. Check your .env file");
    throw new Error("API key is missing. Please check your .env file.");
  }
  // Properly format URL based on whether endpoint already has query params
  const hasQueryParams = endpoint.includes('?');
  const url = `${BASE_URL}${endpoint}${hasQueryParams ? '&' : '?'}api_key=${API_KEY}`;
  
  console.log("Using URL:", url);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(`Failed to fetch: ${data.status_message || response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getPopularMovies = () => fetchMovies("/movie/popular?language=fr-FR");
export const getTrendingMovies = () => fetchMovies("/trending/movie/day?language=fr-FR");
export const getMovieDetails = (id) => fetchMovies(`/movie/${id}?language=fr-FR`);
export const getMoviesByGenre = (genreId) => fetchMovies(`/discover/movie?with_genres=${genreId}&language=fr-FR`);
export const getGenres = async () => fetchMovies("/genre/movie/list?language=fr-FR");
export const searchMovies = (query) => fetchMovies(`/search/movie?query=${query}&language=fr-FR`);
