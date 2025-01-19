import { useState } from "react";

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
    onFilter(value);
  };

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filter-box">
        <select value={priceRange} onChange={handlePriceRangeChange}>
          <option value="all">All Prices</option>
          <option value="0-10">Under ₹10</option>
          <option value="10-15">₹10 - ₹15</option>
          <option value="15+">Over ₹15</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
