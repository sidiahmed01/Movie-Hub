import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="movies-list">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
              <MovieCard movie={movie} />
              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie.id)}
              >Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
}

export default Favorites;