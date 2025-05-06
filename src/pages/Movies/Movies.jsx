import React, { useState, useEffect } from 'react';
import { getPopularMovies, getGenres } from '../../services/api';
import MoviesList from '../../components/MoviesList/MoviesList';
import './Movies.css';
import FilterGenre from '../../components/FilterGenre/FilterGenre';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [genres, setGenres] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);

  const MOVIES_PER_PAGE = 10;

  useEffect(() => {
    getPopularMovies().then((data) => setMovies(data.results));
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    const filtered = movies
      .filter((movie) => {
        return selectedGenre
          ? movie.genre_ids.includes(parseInt(selectedGenre, 10))
          : true;
      })
      .sort((a, b) => {
        if (sortOption === "popularity.desc") {
          return b.popularity - a.popularity;
        } else if (sortOption === "release_date.desc") {
          return new Date(b.release_date) - new Date(a.release_date);
        } else if (sortOption === "vote_average.desc") {
          return b.vote_average - a.vote_average;
        }
        return 0;
      });
    setFilteredMovies(filtered);
  }, [movies, selectedGenre, sortOption]);

  // const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  // Pagination logic
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="movies">
      <div className="movies-filters">
        <FilterGenre selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        <div className="filter-genre">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Release Date</option>
            <option value="vote_average.desc">Rating</option>
          </select>
        </div>
      </div>

      <MoviesList movies={paginatedMovies} />

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >Previous</button>
        <span className='page-number'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >Next</button>
      </div>
    </div>
  );
}

export default Movies;
