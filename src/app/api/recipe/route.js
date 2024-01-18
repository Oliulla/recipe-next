import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request) {
    let result = [];
    let statusCode = 200;

    const data = await request.formData();
    const file = data.get('file')
    const title = data.get('title')
    const instructions = data.get('instructions')
    const ingredients = data.get('ingredients')
    const userId = data.get('userId')

    console.log(file, title, instructions, ingredients, userId)
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