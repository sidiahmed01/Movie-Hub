import React, { useState} from "react";
import "./SearchMovie.css";

function SearchMovie({ searchTerm, setSearchTerm }) {

  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory")) || [];
  });
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value && !searchHistory.includes(value)) {
      const updatedHistory = [value, ...searchHistory.slice(0, 4)];
      setSearchHistory(updatedHistory);

    }
  };


  return (
    <div className="search-movie">
      {/* Search Input */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchMovie;