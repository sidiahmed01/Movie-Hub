import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageUrl = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/public/logo192.png';

  return (
    <div className="movie-card">
      <Link to={movie?.id ? `/movies/${movie.id}` : '#'}>


        <div className="movie-card">
          <img src={imageUrl} alt={movie.title} className="movie-poster" />
          <div className="movie-overlay">

            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.vote_average}/10</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;