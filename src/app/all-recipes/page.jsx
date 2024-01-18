import { RecipeCards } from "@/components/__oneTime/RecipeCard/__RecipeCards";
import React from "react";

const AllRecipes = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold border-b border-b-blue-700 inline">
        All Recipes
      </h1>
      <div className="mt-2 mx-auto">
        <RecipeCards />
      </div>
    </div>
  );
};

export default AllRecipes;
