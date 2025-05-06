import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMoviesByGenre } from "../../services/api";
import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(storedFavorites.some((fav) => fav.id === movieData.id));
        if (movieData.genres.length > 0) {
          const genreId = movieData.genres[0].id;
          const similarMoviesData = await getMoviesByGenre(genreId);
          setSimilarMovies(similarMoviesData.results.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) return <Loading />;
  if (!movie) return <p>Error loading movie details.</p>;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">
      <div className="moviedetails">

        {/* Left Section */}
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>

        {/* Right Section */}
        <div className="movie-info1">
          <h1>
            {movie.title} <span>({movie.release_date.split("-")[0]})</span>
          </h1>
          <div className="rating-section">
            <span className="rating">⭐ {movie.vote_average}</span>
            <span className="reviews">{movie.vote_count} Reviews</span>
          </div>

          <div className="details">
            <p><strong>Duration:</strong> {movie.runtime} mins</p>
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
          </div>



          <p className="overview">{movie.overview}</p>
          <div className="favorite-share-section">
            <button className="action-btn" onClick={toggleFavorite}>
              <span className="icon">{isFavorite ? "💔" : "❤️"}</span>{" "}
              {isFavorite ? "Remove " : "Add to Favorite"}
            </button>
          </div>
        </div>

      </div>

      {/* Similar Movies Section */}
      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <div className="similar-movies-grid">
          {similarMovies.map((similar) => (
            <MovieCard key={similar.id} movie={similar} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default MovieDetails;
