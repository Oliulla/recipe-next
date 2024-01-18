"use client";

import { useEffect, useState } from "react";
import { RecipeCards } from "../__oneTime/RecipeCard/__RecipeCards";

const LatestSixRecipesInHome = () => {
  // const data = await getData();
  // const recipes = data?.data;
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/recipe?latestSixRecipe=true")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setRecipes(data?.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-3xl mt-3 font-semibold">
            Latest 6 Recipes Added By Users
          </h1>
          <div className="mt-2">
            <RecipeCards recipes={recipes} />
          </div>
        </>
      )}
    </div>
  );
};

export default LatestSixRecipesInHome;

// async function getData() {
//   const res = await fetch(
//     "http://localhost:3000/api/recipe?latestSixRecipe=true"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }
