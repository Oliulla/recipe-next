import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    let result = [];
    let statusCode = 200;
    try {
        const recipes = await prisma.recipe.findMany();
        result = {
            statusCode: statusCode,
            message: "All Recipes",
            data: recipes,
        };
        statusCode = 200;

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