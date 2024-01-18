"use client";

import { RecipeCards } from "../__oneTime/RecipeCard/__RecipeCards";

const UserSearchRecipeResult = ({ recipes }) => {
  return (
    <div>
      <h1 className="text-3xl mt-3 font-semibold">Search Matched with</h1>
      <div className="mt-2">
        <RecipeCards recipes={recipes} />
      </div>
    </div>
  );
};

export default UserSearchRecipeResult;
