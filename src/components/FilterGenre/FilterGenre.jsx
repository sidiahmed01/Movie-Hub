/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './FilterGenre.css';
import {  getPopularMovies, getGenres } from '../../services/api';

function FilterGenre({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((data) => {
      if (data && data.genres) {
        setGenres(data.genres);
      } else {
        console.error("La propriété 'genres' est absente dans la réponse :", data);
      }
    }).catch((error) => {
      console.error("Erreur lors de la récupération des genres :", error);
    });
  }, []);
  

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className="filter-genre">
      {/* Filter by Genre */}
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>

  );
}

export default FilterGenre;