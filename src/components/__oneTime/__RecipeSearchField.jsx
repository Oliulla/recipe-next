"use client";

import { FloatingLabel } from "flowbite-react";

export function SearchRecipe({ searchValue, setSearchValue }) {
  return (
    <div className="grid grid-flow-col justify-stretch space-x-4 w-1/2 mx-auto">
      <FloatingLabel
        variant="outlined"
        label="Search Recipes by title or ingredients"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {/* <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="submit" />
      </form> */}
    </div>
  );
}
