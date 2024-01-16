import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    let result = {};
    let statusCode = 200;

    const data = await request.json();

    try {
        // By unique identifier
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } })


        if (existingUser) {
            statusCode = 400;
            result = {
                status: false,
                statusCode: statusCode,
                message: "User with this email already exist!",
            };
            return
        } else {
            const user = await prisma.user.create({
                data: {
                    userName: data.userName,
                    imgUrl: data.imgUrl,
                    email: data.email,
                },
            });
            result = {
                status: true,
                statusCode: statusCode,
                message: "Created Successfully",
                data: user,
            };
        }


    } catch (error) {
        statusCode = 400;
        result = {
            status: false,
            statusCode: statusCode,
            message: "API error",
        };
    } finally {
        await prisma.$disconnect();
        return NextResponse.json(result, { status: statusCode });
    }
}
