import AddRecipeForm from "@/components/__oneTime/__AddRecipeForm";
import getCurrentUser from "@/lib/session";
import React from "react";

const AddRecipes = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <AddRecipeForm user={user} />
    </div>
  );
};

export default AddRecipes;
