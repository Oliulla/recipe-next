"use client";

import { useState } from "react";
import { FloatingLabel } from "flowbite-react";

export function SearchRecipe() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  console.log(searchValue);

  return (
    <div className="grid grid-flow-col justify-stretch space-x-4 w-1/2 mx-auto">
      <FloatingLabel
        variant="outlined"
        label="Find A Recipe"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}
