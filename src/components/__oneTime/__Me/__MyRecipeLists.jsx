"use client";

import { useEffect, useState } from "react";
import { RecipeCards } from "../RecipeCard/__RecipeCards";
import { __dynamicRecipeCardContentDir } from "@/constants/constants";

const MyRecipeLists = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/users?email=${user?.email}`
        );
        const data = await response.json();
        if (data?.data?.id) {
          const res = await fetch(
            `http://localhost:3000/api/userRecipes/${data?.data?.id}`
          );
          const resRecipeData = await res.json();
          setRecipes(resRecipeData?.data);
        }
        // setUserId(data?.data?.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isUpdated]);

  //   console.log(recipes);

  return (
    <div>
      {isLoading ? (
        <p className="text-xl text-gray-900 flex justify-center items-center min-h-screen">
          Loading...
        </p>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-semibold">My Recipes</h1>
          <div>
            <RecipeCards
              recipes={recipes}
              fromWhere={__dynamicRecipeCardContentDir.__MY_RECIPES}
              setIsUpdated={setIsUpdated}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecipeLists;
