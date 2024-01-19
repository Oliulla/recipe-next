import { createApiResponse } from "@/lib/createResponse";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingRecipe) {
            return createApiResponse(404, false, "Recipe not found");
        }

        return createApiResponse(200, true, "Recipe Found", existingRecipe);
    } catch (error) {
        return createApiResponse(400, false, "API error");
    } finally {
        await prisma.$disconnect();
    }
}

// export async function PUT(request, { params }) {
//     const { id } = params;
//     console.log("recipe id:", id)
//     try {
//         const existingRecipe = await prisma.recipe.findUnique({
//             where: {
//                 id: parseInt(id),
//             },
//         });
//         if (!existingRecipe) {
//             return createApiResponse(404, false, "Recipe not found");
//         }

//         const requestBody = await request.json();
//         const { property, value } = requestBody;

//         if (!property || !value) {
//             return createApiResponse(400, false, "Invalid request body");
//         }

//         const updatedRecipe = await prisma.recipe.update({
//             where: {
//                 id: parseInt(id),
//             },
//             data: {
//                 [property]: value,
//             },
//         });

//         return createApiResponse(200, true, "Recipe updated successfully", updatedRecipe);
//     } catch (error) {
//         return createApiResponse(400, false, "API error");
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// PUT handler
export async function PUT(request, { params }) {
    const { id } = params;
    console.log("recipe id:", id);

    try {
        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingRecipe) {
            return createApiResponse(404, false, "Recipe not found");
        }

        const data = await request.formData();
        let file = data.get('file');
        const title = data.get('title');
        const instructions = data.get('instructions');
        const ingredients = data.get('ingredients');

        // when file is null then file default BLOB value set when SQLite DB is not migrated properly
        if (file === null) {
            file = "default0blob0null0value";
        }

        // Update the specific properties
        const updatedRecipe = await prisma.recipe.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title,
                instructions: instructions,
                ingredients: ingredients,
                // Add other properties as needed
            },
        });

        return createApiResponse(200, true, "Recipe updated successfully", updatedRecipe);
    } catch (error) {
        return createApiResponse(400, false, "API error");
    } finally {
        await prisma.$disconnect();
    }
}


export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingRecipe) {
            return createApiResponse(404, false, "Recipe not found");
        }

        await prisma.recipe.delete({
            where: {
                id: parseInt(id),
            },
        });

        return createApiResponse(200, true, "Recipe deleted successfully");
    } catch (error) {
        return createApiResponse(400, false, "API error");
    } finally {
        await prisma.$disconnect();
    }
}
