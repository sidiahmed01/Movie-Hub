import React, { useEffect, useState, useRef } from 'react';
import { getPopularMovies, getTrendingMovies, getGenres } from '../../services/api';
import MovieCard from '../../components/MovieCard/MovieCard.jsx';
import './Home.css';
import SearchMovie from '../../components/SearchMovie/SearchMovie.jsx';
import FilterGenre from '../../components/FilterGenre/FilterGenre';
import '../../components/Navbar/Navbar.css';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    getPopularMovies().then((data) => setPopularMovies(data.results));
    getTrendingMovies().then((data) => setTrendingMovies(data.results));
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  const filteredMovies = popularMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.genre_ids.includes(parseInt(selectedGenre, 10))
      : true;
    return matchesSearch && matchesGenre;
  });


  // Carousel scrolling
  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="home">

        {/* Trending Movies Carousel */}
        <div className="carousel-container slider">
          <button className="carousel-arrow left" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="trending-carousel" ref={carouselRef}>
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="carousel-item">
                <MovieCard movie={movie} genres={genres} />
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={scrollRight}>
            &#8250;
          </button>
        </div>


        {/* Filtered Popular Movies */}
        <section className='section2'>
          <div className='FilterMovie'>
            <FilterGenre selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
            <SearchMovie searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <h2>Most Populars</h2>
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;