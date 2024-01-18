"use client";

import React, { useEffect, useState } from "react";
import { SearchRecipe } from "./__RecipeSearchField";
import UserSearchRecipeResult from "../shared/__UserSearchRecipeResult";
import LatestSixRecipesInHome from "../shared/__LatestSixRecipesInHome";
import { FloatingLabel } from "flowbite-react";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchRecipes, setSearchRecipes] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // setSearchValue(e.target.value);
  //   console.log(e);
  // };

  // console.log(searchValue)

  useEffect(() => {
    if (searchValue) {
      fetch(`http://localhost:3000/api/recipe?search=${searchValue}`)
        .then((res) => res.json())
        .then((data) => setSearchRecipes(data?.data))
        .catch((err) => console.log(err));
    }
  }, [searchValue]);

  // console.log(searchValue);

  return (
    <div className="">
      {/* <FloatingLabel
        variant="outlined"
        label="Search Recipes by title or ingredients"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      /> */}
      <SearchRecipe searchValue={searchValue} setSearchValue={setSearchValue} />
      <div>
        {searchRecipes?.length === 0 && searchValue ? (
          <p className="mt-8 text-red-600 text-3xl text-center">Not matched!</p>
        ) : searchRecipes?.length > 0 ? (
          <div>
            <UserSearchRecipeResult recipes={searchRecipes} />
          </div>
        ) : (
          <div>
            <LatestSixRecipesInHome />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
