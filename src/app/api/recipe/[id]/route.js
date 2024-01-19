import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    let result = [];
    let statusCode = 200;
    let success = true

    const { id } = params;

    // console.log(id)

    try {

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        result = {
            statusCode,
            success,
            message: "Recipe Found",
            data: recipe,
        }

    } catch (error) {
        if (error) {
            statusCode = 400;
            success = false
            result = {
                statusCode: statusCode,
                success,
                message: "API error",
            }
        }
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode },);
    }
}


export async function PUT(request, { params }) {
    let result = {};
    let statusCode = 200;
    let success = true

    const { id } = params;
    // console.log(id)

    try {
        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingRecipe) {
            statusCode = 404;
            success = false
            result = {
                statusCode,
                success,
                message: "Recipe not found",
            };
        } else {
            const requestBody = await request.json();

            // Extract the property to update and its value from the request body
            const { property, value } = requestBody;

            if (!property || !value) {
                statusCode = 400;
                success = false
                result = {
                    statusCode,
                    success,
                    message: "Invalid request body",
                };
            } else {
                // Update the specific property
                const updatedRecipe = await prisma.recipe.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        [property]: value,
                    },
                });

                result = {
                    statusCode,
                    success,
                    message: "Recipe updated successfully",
                    data: updatedRecipe,
                };
            }
        }
    } catch (error) {
        statusCode = 400;
        success = false
        result = {
            statusCode,
            success,
            message: "API error",
        };
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode });
    }
}

export async function DELETE(request, { params }) {
    let result = {};
    let statusCode = 200;
    let success = true

    const { id } = params;

    // console.log(id)

    try {
        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingRecipe) {
            statusCode = 404;
            success = false
            result = {
                statusCode,
                success,
                message: "Recipe not found",
            };
        } else {
            // Delete the specific recipe
            await prisma.recipe.delete({
                where: {
                    id: parseInt(id),
                },
            });

            result = {
                statusCode,
                success,
                message: "Recipe deleted successfully",
            };
        }
    } catch (error) {
        statusCode = 400;
        success = false;
        result = {
            statusCode,
            success,
            message: "API error",
        };
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode });
    }
}