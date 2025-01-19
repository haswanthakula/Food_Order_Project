import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
import SearchAndFilter from "./SearchAndFilter.jsx";
import "./Meals.css";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("https://food-json.onrender.com/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals!");
        }

        const meals = await response.json();
        setLoadedMeals(meals);
        setFilteredMeals(meals);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = loadedMeals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  const handleFilter = (priceRange) => {
    let filtered = [...loadedMeals];

    switch (priceRange) {
      case "0-10":
        filtered = filtered.filter((meal) => parseFloat(meal.price) < 10);
        break;
      case "10-15":
        filtered = filtered.filter(
          (meal) => parseFloat(meal.price) >= 10 && parseFloat(meal.price) <= 15
        );
        break;
      case "15+":
        filtered = filtered.filter((meal) => parseFloat(meal.price) > 15);
        break;
      default:
        // "all" - no filtering needed
        break;
    }

    setFilteredMeals(filtered);
  };

  if (isLoading) {
    return <p className="meals-loading">Loading meals...</p>;
  }

  if (error) {
    return <p className="meals-error">{error}</p>;
  }

  return (
    <>
      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      {filteredMeals.length === 0 ? (
        <p className="meals-error">No meals found matching your criteria.</p>
      ) : (
        <ul id="meals">
          {filteredMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Meals;
