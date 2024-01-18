"use client";

import { Button, Checkbox, Label, Modal } from "flowbite-react";
import PageLoader from "next/dist/client/page-loader";
import { useEffect, useState } from "react";
// import AddRecipeForm from "../../__AddRecipeForm";

export default function RecipeUpdateModal({ recipe }) {
  const [openModal, setOpenModal] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState(recipe?.title);
  const [selectedIngredients, setSelectedIngredients] = useState({});

  const [ingredients, setIngredients] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchIngredients() {
      try {
        const response = await fetch("http://localhost:3000/ingredients.json");
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  const updateRecipeTitleHandler = () => {
    console.log();
  };

  const handleCheckboxChange = (label) => {
    setSelectedIngredients((prevSelected) => ({
      ...prevSelected,
      [label]: !prevSelected[label],
    }));
  };

  //   console.log(selectedIngredients);
  const updateIngredientsHandler = () => {
    const selectedArr = Object.keys(selectedIngredients).filter(
      (label) => selectedIngredients[label]
    );

    if (selectedArr.length === 0) {
      alert("Select at least one ingredient");
      return;
    }

    console.log(selectedArr);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-900 rounded px-3 py-2 text-white"
      >
        Update
      </button>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
        dismissible
        size="full"
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="px-10"
      >
        <Modal.Header>Update Your Recipe</Modal.Header>
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <Modal.Body>
              <div className="flex flex-col gap-y-20">
                <div>
                  <label>Recipe Title *</label>
                  <div className="flex gap-x-2">
                    <input
                      type="text"
                      value={recipeTitle}
                      onChange={(e) => setRecipeTitle(e.target.value)}
                      className="w-full"
                    />
                    <button
                      onClick={() => updateRecipeTitleHandler()}
                      className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-1/6 text-white"
                    >
                      Save Change
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-black block mb-2">
                    Recipe Ingredients *
                  </Label>
                  <div className="grid grid-cols-7 gap-x-2 gap-y-3">
                    {ingredients?.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center gap-1"
                      >
                        <Checkbox
                          id={ingredient.id}
                          checked={
                            selectedIngredients[ingredient.label] || false
                          }
                          onChange={() =>
                            handleCheckboxChange(ingredient.label)
                          }
                        />
                        <Label
                          htmlFor={ingredient.id}
                          className="text-black text-xs"
                        >
                          {ingredient.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => updateIngredientsHandler()}
                      className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-1/6 py-3 px-2 text-white mt-2"
                    >
                      Save Change
                    </button>
                  </div>
                </div>

                <div>instructions</div>

                <div>image</div>
              </div>
            </Modal.Body>
          </>
        )}

        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Done & Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
