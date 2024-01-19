"use client";

import { Button, Checkbox, FileInput, Label, Modal } from "flowbite-react";
import PageLoader from "next/dist/client/page-loader";
import { useEffect, useState } from "react";
import Editor from "../../__Editor";
import { LoadingButton } from "@/components/shared/Loader/__LoadingButton";

export default function RecipeUpdateModal({ recipe, dataUri, setIsUpdated }) {
  const [openModal, setOpenModal] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [editorValue, setEditorValue] = useState({
    instructions: `${recipe?.instructions}`,
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [targetLoadingButton, setTargetLoadingButton] = useState("");

  const oldSelectedRecipesArray = recipe?.ingredients?.split(",") || [];

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

  useEffect(() => {
    if (recipe) {
      // Initialize selected ingredients based on existing recipe data
      const initialSelectedIngredients = {};
      oldSelectedRecipesArray.forEach((label) => {
        initialSelectedIngredients[label] = true;
      });
      setSelectedIngredients(initialSelectedIngredients);
      setRecipeTitle(recipe?.title || "");
    }
  }, []);

  const handleCheckboxChange = (label) => {
    setSelectedIngredients((prevSelected) => ({
      ...prevSelected,
      [label]: !prevSelected[label],
    }));
  };

  const handleEditor = (eventKey, e) => {
    setEditorValue((prevEditorValue) => ({
      ...prevEditorValue,
      [eventKey]: e,
    }));
    // Assuming instructions are directly updated in the state
    setInstructions(e);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const updateFieldHandler = async (targetedField) => {
    setTargetLoadingButton(targetedField);
    setIsSubmitButtonLoading(true);

    let value;

    if (targetedField === "title") {
      value = recipeTitle;
    } else if (targetedField === "ingredients") {
      const selectedArr = Object.keys(selectedIngredients).filter(
        (label) => selectedIngredients[label]
      );

      if (selectedArr.length === 0) {
        alert("Select at least one ingredient");
        return;
      }
      value = JSON.stringify(selectedArr);
    } else if (targetedField === "instructions") {
      value = instructions;
    } else if (targetedField === "image") {
      const formData = new FormData();
      formData.set("file", selectedFile);
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/recipe/${recipe?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: targetedField,
            value: value,
          }),
        }
      );

      const data = await res.json();
      // console.log(data);
      if (data?.success) {
        alert(data?.message);
        setIsUpdated(true);
        return;
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTargetLoadingButton("");
      setIsSubmitButtonLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-900 rounded px-3 py-2 text-white"
      >
        Update
      </button>

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
                    {isSubmitButtonLoading &&
                    targetLoadingButton === "title" ? (
                      <LoadingButton />
                    ) : (
                      <button
                        onClick={() => updateFieldHandler("title")}
                        className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-1/6 text-white"
                      >
                        Save Change
                      </button>
                    )}
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
                    {isSubmitButtonLoading &&
                    targetLoadingButton === "ingredients" ? (
                      <LoadingButton />
                    ) : (
                      <button
                        onClick={() => updateFieldHandler("ingredients")}
                        className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-1/6 py-3 px-2 text-white mt-2"
                      >
                        Save Change
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex flex-col">
                    <div className="editor">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="instructions"
                          value="Recipe Instructions *"
                          className="text-white"
                        />
                      </div>
                      <Editor
                        editorValue={editorValue}
                        handleInputChange={handleEditor}
                      />
                    </div>
                    <div className="">
                      {isSubmitButtonLoading &&
                      targetLoadingButton === "instructions" ? (
                        <LoadingButton />
                      ) : (
                        <button
                          onClick={() => updateFieldHandler("instructions")}
                          className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-full py-3 px-2 text-white -mb-8"
                        >
                          Save Change for Instructions
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-x-6">
                    <div className="w-64">
                      <label>Current Recipe Image</label>
                      <img
                        src={dataUri}
                        alt="Recipe Image"
                        className="w-64 h-64"
                      />
                    </div>

                    <div className="w-full">
                      <Label className="text-black block mb-2">
                        Drop Or Browse To Update Recipe Image{" "}
                      </Label>
                      <Label
                        htmlFor="dropzone-file"
                        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          {selectedFile && (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              Selected File: {selectedFile.name}
                            </p>
                          )}
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        </div>

                        <FileInput
                          id="dropzone-file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </Label>
                    </div>

                    <div className="w-1/6 flex items-end h-64">
                      {isSubmitButtonLoading &&
                      targetLoadingButton === "image" ? (
                        <LoadingButton />
                      ) : (
                        <button
                          onClick={() => updateFieldHandler("image")}
                          className="bg-indigo-900 hover:bg-indigo-950 rounded-md w-full py-3 px-2 text-white -mb-8"
                        >
                          Save Change
                        </button>
                      )}
                    </div>
                  </div>
                </div>
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
