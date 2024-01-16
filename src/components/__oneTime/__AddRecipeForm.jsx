// // "use client";

// // import { FloatingLabel, Checkbox, Label, Textarea } from "flowbite-react";
// // import { useForm, useFieldArray } from "react-hook-form";
// // import { useEffect, useState } from "react";
// // import BlogContentEditor from "./__RecipeInstructionsEditor";

// // const AddRecipeForm = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [ingredients, setIngredients] = useState([]);
// //   const [inputValue, setInputValue] = useState({
// //     instructions: "",
// //   });
// //   const {
// //     handleSubmit,
// //     control,
// //     register,
// //     setValue,
// //     formState: { errors },
// //     getValues,
// //   } = useForm({
// //     defaultValues: { ingredients: [] },
// //   });
// //   const { append, remove } = useFieldArray({
// //     control,
// //     name: "ingredients",
// //   });

// //   useEffect(() => {
// //     async function fetchIngredients() {
// //       try {
// //         const response = await fetch("ingredients.json");
// //         const data = await response.json();
// //         setIngredients(data);
// //       } catch (error) {
// //         console.error("Error fetching ingredients:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }

// //     fetchIngredients();
// //   }, []);

// //   const onSubmit = (data) => {
// //     console.log(data);

// //     const selectedArr = [];

// //     data.ingredients.forEach((ingredientObj, index) => {
// //       const ingredientName = Object.keys(ingredientObj)[0];
// //       const isChecked = ingredientObj[ingredientName];

// //       if (isChecked) {
// //         const foundIngredient = ingredients.find(
// //           (ing) => ing.label === ingredientName
// //         );
// //         if (foundIngredient) {
// //           selectedArr.push(foundIngredient.label);
// //         }
// //       }
// //     });

// //     if (selectedArr.length === 0) {
// //       alert("Select at least one ingredient");
// //     } else {
// //       // code will be start from here
// //     }
// //   };

// //   const handleBlogContentEditor = (eventKey, e) => {
// //     setInputValue((prevInputValue) => ({
// //       ...prevInputValue,
// //       [eventKey]: e,
// //     }));
// //   };

// //   return (
// //     <div className="px-4 py-2">
// //       {isLoading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div className="bg-gray-800 min-h-screen w-full">
// //           <h1 className="py-4 text-3xl font-bold text-center text-white">
// //             Add A Recipe
// //           </h1>
// //           <form
// //             className="w-3/4 mx-auto mt-8 pb-4"
// //             onSubmit={handleSubmit(onSubmit)}
// //           >
// //             <div className="flex flex-col gap-y-8">
// //               <div>
// //                 <FloatingLabel
// //                   variant="standard"
// //                   label="Recipe Title"
// //                   className="bg-inherit text-white"
// //                   {...register("recipeTitle", {
// //                     required: "Recipe title is required",
// //                   })}
// //                 />
// //                 {errors.recipeTitle && (
// //                   <p className="text-red-500">{errors.recipeTitle.message}</p>
// //                 )}
// //               </div>
// //               <div>
// //                 <Label className="text-white block mb-2">
// //                   Recipe Ingredients
// //                 </Label>
// //                 <div className="grid grid-cols-7 gap-x-2 gap-y-3">
// //                   {ingredients?.map((ingredient, index) => (
// //                     <div
// //                       key={ingredient.id}
// //                       className="flex items-center gap-1"
// //                     >
// //                       <Checkbox
// //                         id={ingredient.id}
// //                         {...register(
// //                           `ingredients.${index}.${ingredient.label}`
// //                         )}
// //                       />
// //                       <Label
// //                         htmlFor={ingredient.id}
// //                         className="text-white text-xs"
// //                       >
// //                         {ingredient.label}
// //                       </Label>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div className="max-w-md">
// //                 <div className="mb-2 block">
// //                   <Label
// //                     htmlFor="instructions"
// //                     value="Recipe Instructions"
// //                     className="text-white"
// //                   />
// //                 </div>
// //                 <Textarea
// //                   id="instructions"
// //                   placeholder="Leave recipe instructions here..."
// //                   required
// //                   rows={4}
// //                 />
// //               </div>
// //               <div className="edtor">
// //                 <BlogContentEditor
// //                   inputValue={inputValue}
// //                   handleInputChange={handleBlogContentEditor}
// //                 />
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="bg-blue-500 text-white p-2 rounded"
// //               >
// //                 Submit
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddRecipeForm;

// 'use client';

// import { FloatingLabel, Checkbox, Label } from "flowbite-react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { useEffect, useState } from "react";
// import BlogContentEditor from "./__Editor";

// const AddRecipeForm = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [ingredients, setIngredients] = useState([]);
//   const {
//     handleSubmit,
//     control,
//     register,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm({
//     defaultValues: { ingredients: [] },
//   });
//   const { append, remove } = useFieldArray({
//     control,
//     name: "ingredients",
//   });

//   useEffect(() => {
//     async function fetchIngredients() {
//       try {
//         const response = await fetch("ingredients.json");
//         const data = await response.json();
//         setIngredients(data);
//       } catch (error) {
//         console.error("Error fetching ingredients:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchIngredients();
//   }, []);

//   const onSubmit = (data) => {
//     console.log(data);

//     const selectedArr = [];

//     data.ingredients.forEach((ingredientObj, index) => {
//       const ingredientName = Object.keys(ingredientObj)[0];
//       const isChecked = ingredientObj[ingredientName];

//       if (isChecked) {
//         const foundIngredient = ingredients.find(
//           (ing) => ing.label === ingredientName
//         );
//         if (foundIngredient) {
//           selectedArr.push(foundIngredient.label);
//         }
//       }
//     });

//     if (selectedArr.length === 0) {
//       alert("Select at least one ingredient");
//     } else {
//       // code will be start from here
//     }
//   };

//   console.log(getValues())

//   return (
//     <div className="px-4 py-2">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="bg-gray-800 min-h-screen w-full">
//           <h1 className="py-4 text-3xl font-bold text-center text-white">
//             Add A Recipe
//           </h1>
//           <form
//             className="w-3/4 mx-auto mt-8 pb-4"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="flex flex-col gap-y-8">
//               <div>
//                 <FloatingLabel
//                   variant="standard"
//                   label="Recipe Title"
//                   className="bg-inherit text-white"
//                   {...register("recipeTitle", {
//                     required: "Recipe title is required",
//                   })}
//                 />
//                 {errors.recipeTitle && (
//                   <p className="text-red-500">{errors.recipeTitle.message}</p>
//                 )}
//               </div>
//               <div>
//                 <Label className="text-white block mb-2">
//                   Recipe Ingredients
//                 </Label>
//                 <div className="grid grid-cols-7 gap-x-2 gap-y-3">
//                   {ingredients?.map((ingredient, index) => (
//                     <div
//                       key={ingredient.id}
//                       className="flex items-center gap-1"
//                     >
//                       <Controller
//                         render={({ field }) => (
//                           <Checkbox id={ingredient.id} {...field} />
//                         )}
//                         control={control}
//                         name={`ingredients.${index}.${ingredient.label}`}
//                       />
//                       <Label
//                         htmlFor={ingredient.id}
//                         className="text-white text-xs"
//                       >
//                         {ingredient.label}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="editor">
//                 <div className="mb-2 block">
//                   <Label
//                     htmlFor="instructions"
//                     value="Recipe Instructions"
//                     className="text-white"
//                   />
//                 </div>
//                 <Controller
//                   render={({ field }) => (
//                     <BlogContentEditor
//                       inputValue={field.value}
//                       handleInputChange={(e) => field.onChange(e)}
//                     />
//                   )}
//                   control={control}
//                   name="instructions"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddRecipeForm;

"use client";

import React, { useState, useEffect } from "react";
import { FloatingLabel, Checkbox, Label } from "flowbite-react";
import Editor from "./__Editor";

const AddRecipeForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [instructions, setInstructions] = useState("");
  const [inputValue, setInputValue] = useState({
    instructions: "",
  });

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("ingredients.json");
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

  const handleCheckboxChange = (label) => {
    setSelectedIngredients((prevSelected) => ({
      ...prevSelected,
      [label]: !prevSelected[label],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const selectedArr = Object.keys(selectedIngredients).filter(
      (label) => selectedIngredients[label]
    );

    if (selectedArr.length === 0) {
      alert("Select at least one ingredient");
    } else {
      // Start your code here
      console.log("Recipe Title:", recipeTitle);
      console.log("Selected Ingredients:", selectedArr);
      console.log("Instructions:", instructions);
    }
  };

  const handleEditor = (eventKey, e) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [eventKey]: e,
    }));
    setInstructions(e); // Assuming instructions are directly updated in the state
  };

  return (
    <div className="px-4 py-2">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-800 min-h-screen w-full">
          <h1 className="py-4 text-3xl font-bold text-center text-white">
            Add A Recipe
          </h1>
          <form className="w-3/4 mx-auto mt-8 pb-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-8">
              <div>
                <FloatingLabel
                  variant="standard"
                  label="Recipe Title"
                  className="bg-inherit text-white"
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-white block mb-2">
                  Recipe Ingredients
                </Label>
                <div className="grid grid-cols-7 gap-x-2 gap-y-3">
                  {ingredients?.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center gap-1"
                    >
                      <Checkbox
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.label] || false}
                        onChange={() => handleCheckboxChange(ingredient.label)}
                      />
                      <Label
                        htmlFor={ingredient.id}
                        className="text-white text-xs"
                      >
                        {ingredient.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="editor">
                <div className="mb-2 block">
                  <Label
                    htmlFor="instructions"
                    value="Recipe Instructions"
                    className="text-white"
                  />
                </div>
                <Editor
                  inputValue={inputValue}
                  handleInputChange={handleEditor}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddRecipeForm;
