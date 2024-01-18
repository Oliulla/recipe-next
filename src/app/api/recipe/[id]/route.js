import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    let result = [];
    let statusCode = 200;

    const { id } = params;

    // console.log(id)

    try {

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        result = {
            statusCode: statusCode,
            message: "Recipe Found",
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