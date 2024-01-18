'use client'

import RecipeDetails from "@/components/__oneTime/RecipeDetails/__RecipeDetails";
import { useEffect, useState } from "react";

export default function BlogDetailsPage({ params }) {
    const [isLoading, setIsLoading] = useState(false);
    const [recipe, setRecipe] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/recipe/${params?.id}`);
                const data = await response.json();
                setRecipe(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params]);



    return (
        <section className="mx-auto container px-4 my-4">
            {
                recipe?.title && <RecipeDetails recipe={recipe} isLoading={isLoading} />
            }
        </section>
    )
}