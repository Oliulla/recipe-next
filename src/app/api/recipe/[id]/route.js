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
    // console.log("recipe id:", id);

    let property;
    let value = null;

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
        // console.log(data)
        const title = data.get('title');
        const instructions = data.get('instructions');
        const ingredients = data.get('ingredients');
        const file = data.get('file');

        if (title) {
            property = "title";
            value = title;
        } else if (ingredients) {
            property = "ingredients";
            value = ingredients;
        } else if (instructions) {
            property = "instructions";
            value = instructions;
        } else if (file) {
            property = "image";
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            value = buffer;
        } else {
            return createApiResponse(400, false, "No valid property to update");
        }

        // Construct an object to update data
        if (!value) {
            return createApiResponse(500, false, `${property} couldn't be empty`);
        }
        const updatedData = {
            [property]: value
        };

        // Update the specific properties
        const updatedRecipe = await prisma.recipe.update({
            where: {
                id: parseInt(id),
            },
            data: updatedData,
        });

        return createApiResponse(200, true, "Recipe updated successfully", updatedRecipe);
    } catch (error) {
        console.error("Error in PUT handler:", error);
        return createApiResponse(500, false, "Internal server error");
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
