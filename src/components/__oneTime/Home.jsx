"use client";

import React, { useState } from "react";
import { SearchRecipe } from "./__RecipeSearchField";
import UserSearchRecipeResult from "../shared/__UserSearchRecipeResult";
import LatestSixRecipesInHome from "../shared/__LatestSixRecipesInHome";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // console.log(searchValue);
  const userSearchRecipe = null;

  return (
    <div className="">
      <SearchRecipe
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
      />
      <div className="flex justify-center w-full">
        {userSearchRecipe ? (
          <div>
            <UserSearchRecipeResult />
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
