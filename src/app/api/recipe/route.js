import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request) {
    let result = [];
    let statusCode = 200;

    const data = await request.formData();
    let file = data.get('file')
    const title = data.get('title')
    const instructions = data.get('instructions')
    const ingredients = data.get('ingredients')
    const userId = data.get('userId')

    // when file is null then file default BLOB value set when sqLite DB is not migrate properly
    if (file === null) {
        file = "default0blob0null0value"
    }

    // console.log(file, title, instructions, ingredients, userId)
    try {

        if (!title || !instructions || !ingredients) {
            statusCode = 400;
            result = {
                statusCode: statusCode,
                message: "Title, instructions or ingredients is missing!!!",
            }
            return NextResponse.json(result, { status: statusCode },);
        };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // console.log(buffer)
        // const recipeData = JSON.stringify({
        //     title: title,
        //     ingredients: ingredients,
        //     instructions: instructions,
        //     image: buffer
        // })
        const recipe = await prisma.recipe.create({
            data: {
                title: title,
                ingredients: ingredients,
                instructions: instructions,
                image: buffer,
                userId: parseInt(userId)
            }
        });

        result = {
            statusCode: statusCode,
            message: "Recipe Created",
            data: recipe,
        }
    } catch (error) {
        if (error) {
            statusCode = 400;
            result = {
                statusCode: statusCode,
                message: "API error",
            }
        }
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode },);
    }

}

// export async function GET(request) {
//     let result = [];
//     let statusCode = 200;

//     try {
//         const search = request.nextUrl.searchParams.get('search');
//         let recipes = await prisma.recipe.findMany();

//         // Searching by title or ingredients
//         if (search) {
//             const searchTerm = search.toLowerCase();
//             recipes = recipes.filter(
//                 (recipe) =>
//                     recipe.title.toLowerCase().includes(searchTerm) ||
//                     recipe.ingredients.toLowerCase().includes(searchTerm)
//             );
//         }

//         let responseData = {
//             statusCode: statusCode,
//             message: "Recipes",
//             data: recipes,
//         };

//         const latestSixRecipe = request.nextUrl.searchParams.get("latestSixRecipe");

//         if (latestSixRecipe && latestSixRecipe.toLowerCase() === "true") {
//             // If latestSixRecipe is true, return the last six recipes
//             const latestRecipes = await prisma.recipe.findMany({
//                 orderBy: {
//                     // Assuming there's a 'createdAt' field in your Recipe model
//                     createdAt: 'desc',
//                 },
//                 take: 6,
//             });

//             responseData.data = latestRecipes;
//         }

//         result = responseData;
//     } catch (error) {
//         statusCode = 400;
//         result = {
//             statusCode: statusCode,
//             message: "API error",
//         };
//     } finally {
//         await prisma.$disconnect();
//         return NextResponse.json(result, { status: statusCode });
//     }
// }

export async function GET(request) {
    let result = [];
    let statusCode = 200;

    try {
        const search = request.nextUrl.searchParams.get('search');
        let recipes;

        if (search) {
            const searchTerm = search.toLowerCase();

            // Use Prisma query for search
            recipes = await prisma.recipe.findMany({
                where: {
                    OR: [
                        { title: { contains: searchTerm } },
                        { ingredients: { contains: searchTerm } },
                    ],
                },
            });
        } else {
            // Fetch all recipes if no search term is provided
            recipes = await prisma.recipe.findMany();
        }

        let responseData = {
            statusCode: statusCode,
            message: "Recipes",
            data: recipes,
        };

        const latestSixRecipe = request.nextUrl.searchParams.get("latestSixRecipe");

        if (latestSixRecipe && latestSixRecipe.toLowerCase() === "true") {
            // If latestSixRecipe is true, return the last six recipes
            const latestRecipes = await prisma.recipe.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                take: 6,
            });

            responseData.data = latestRecipes;
        }

        result = responseData;
    } catch (error) {
        statusCode = 400;
        result = {
            statusCode: statusCode,
            message: "API error",
        };
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode });
    }
}
