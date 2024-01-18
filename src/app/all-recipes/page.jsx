import { RecipeCards } from "@/components/__oneTime/RecipeCard/__RecipeCards";
import React from "react";

async function getData() {
  const res = await fetch("http://localhost:3000/api/recipe");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const AllRecipes = async () => {
  const data = await getData();
  const recipes = data?.data;

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold border-b border-b-blue-700 inline">
        All Recipes
      </h1>
      <div className="mt-2 mx-auto">
        <RecipeCards recipes={recipes} />
      </div>
    </div>
  );
};

export default AllRecipes;
