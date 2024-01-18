import { Suspense } from "react";

const RecipeDetails = ({ recipe, isLoading }) => {
  //   const { title, ingredients, image, instructions } = recipe;

  // console.log(title, ingredients, image, instructions);
  //   console.log(recipe);

  // Convert the Buffer data to a base64-encoded string
  const base64Image = Buffer.from(recipe?.image.data).toString("base64");
  const imgUrl = `data:image/jpeg;base64,${base64Image}`;

  //   console.log("ingr", recipe?.ingredients.split(","));

  const ingredients = recipe?.ingredients.split(",");

  const filteredContent = recipe?.instructions.replace(/<img[^>]*>/, "");

  return (
    <>
      {!isLoading && (
        <div>
          <>
            <div className="mt-8 w-full max-w-screen-lg mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-violet-900">{recipe?.title}</h1>
              <div className="flex">
                <div className="mr-8">
                  <p className="text-3xl font-bold">Ingredinets:</p>
                  <ol>
                    {ingredients?.length > 0
                      ? ingredients?.map((ingr, idx) => (
                          <li key={idx} className="text-xl mt-2">
                            <span className="font-semibold">{idx + 1}. </span>
                            {ingr}
                          </li>
                        ))
                      : ""}
                  </ol>
                </div>
                <div>
                  <Suspense fallback={isLoading && <p>Loading...</p>}>
                    <img
                      width={900}
                      height={400}
                      className="h-auto"
                      src={imgUrl ? imgUrl : ""}
                      alt="recipe image"
                    />
                  </Suspense>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-semibold">Instructions:</p>
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: filteredContent }}
                />
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
