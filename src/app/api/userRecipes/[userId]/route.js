import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    let result = [];
    let statusCode = 200;

    const { userId } = params;

    console.log("userid", userId)

    try {

        const recipes = await prisma.recipe.findMany({
            where: {
                userId: parseInt(userId)
            }
        });

        result = {
            statusCode: statusCode,
            message: "Recipe Found",
            data: recipes,
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