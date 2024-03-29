// 'use client';
import Link from "next/link";
import "./__singleCard.css";

import { Card } from "flowbite-react";
import { __dynamicRecipeCardContentDir } from "@/constants/constants";
import RecipeDeleteModal from "../__Me/__RecipeRelatedModals/__RecipeDeleteModal";
import RecipeUpdateModal from "../__Me/__RecipeRelatedModals/__RecipeUpdateModal";

export function SingleCard({ recipe, fromWhere, setIsUpdated }) {
  // Destructure the recipe data
  const { title, image } = recipe;

  // Convert the Buffer data to a base64-encoded string
  const base64Image = Buffer.from(image.data).toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64Image}`;

  return (
    <>
      {fromWhere === __dynamicRecipeCardContentDir.__MY_RECIPES ? (
        <>
          <Card className="max-w-sm h-full" imgAlt={title} imgSrc={dataUri}>
            <div className="">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <div className="flex justify-center gap-x-8 mt-6">
                <div>
                  <RecipeDeleteModal
                    recipeName={recipe?.title}
                    id={recipe?.id}
                    setIsUpdated={setIsUpdated}
                  />
                </div>
                <div>
                  <RecipeUpdateModal
                    recipe={recipe}
                    dataUri={dataUri}
                    setIsUpdated={setIsUpdated}
                  />
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Link href={`/recipe-details/${recipe.id}`} className="block">
          <Card className="max-w-sm h-full" imgAlt={title} imgSrc={dataUri}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Card>
        </Link>
      )}
    </>
  );
}
