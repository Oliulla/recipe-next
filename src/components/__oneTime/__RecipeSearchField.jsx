"use client";

import { FloatingLabel } from "flowbite-react";

export function SearchRecipe({ handleSearchChange, searchValue }) {
  return (
    <div className="grid grid-flow-col justify-stretch space-x-4 w-1/2 mx-auto">
      <FloatingLabel
        variant="outlined"
        label="Search Recipes by title or ingredients"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}
