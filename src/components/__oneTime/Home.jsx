"use client";

import React, { useState } from "react";
import { SearchRecipe } from "./__RecipeSearchField";
import LastFiveRecipesInHome from "../shared/__LastFiveRecipesInHome";
import UserSearchRecipeResult from "../shared/__UserSearchRecipeResult";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  console.log(searchValue);
  const userSearchRecipe = null;

  return (
    <div>
      <SearchRecipe
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
      />
      <div>
        {userSearchRecipe ? (
          <>
            <UserSearchRecipeResult />
          </>
        ) : (
          <>
            <LastFiveRecipesInHome />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
