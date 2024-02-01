// SearchBar.js

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients/search",
        {
          params: { searchQuery: searchInput },
        }
      );

      const searchResults = response.data;
      onSearch(searchInput, searchResults);
    } catch (error) {
      console.error("Error searching patients:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="search-bar mx-2">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn" type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
