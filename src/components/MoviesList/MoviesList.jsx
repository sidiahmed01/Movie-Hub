import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

function MoviesList({ movies }) {
  return (
    <div className="movies-list">
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}

export default MoviesList;