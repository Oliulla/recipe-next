// 'use client';
import Link from "next/link";
import "./__singleCard.css";

import { Card } from "flowbite-react";

export function SingleCard({ recipe }) {
  // Destructure the recipe data
  const { title, image } = recipe;

  // Convert the Buffer data to a base64-encoded string
  const base64Image = Buffer.from(image.data).toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64Image}`;

  return (
    <Link href={`/recipe-details/${recipe.id}`} className="block">
      <Card className="max-w-sm h-full" imgAlt={title} imgSrc={dataUri}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </Card>
    </Link>
  );
}
