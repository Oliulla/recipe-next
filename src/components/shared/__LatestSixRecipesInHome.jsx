"use client";

import { RecipeCards } from "../__oneTime/RecipeCard/__RecipeCards";

const LatestSixRecipesInHome = () => {
  return (
    <div>
      <h1 className="text-3xl mt-3 font-semibold">
        Latest 6 Recipes Added By Users
      </h1>
      <div className="mt-2">
        <RecipeCards />
      </div>
    </div>
  );
};

export default LatestSixRecipesInHome;
