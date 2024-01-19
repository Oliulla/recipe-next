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


export async function PUT(request, { params }) {
    let result = {};
    let statusCode = 200;
  
    const { id } = params;
    console.log(id)
  
    try {
      const existingRecipe = await prisma.recipe.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!existingRecipe) {
        statusCode = 404;
        result = {
          statusCode,
          message: "Recipe not found",
        };
      } else {
        const requestBody = await request.json();
  
        // Extract the property to update and its value from the request body
        const { property, value } = requestBody;
  
        if (!property || !value) {
          statusCode = 400;
          result = {
            statusCode,
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
            message: "Recipe updated successfully",
            data: updatedRecipe,
          };
        }
      }
    } catch (error) {
      statusCode = 400;
      result = {
        statusCode,
        message: "API error",
      };
    } finally {
      await prisma.$disconnect();
      return NextResponse.json(result, { status: statusCode });
    }
  }
  