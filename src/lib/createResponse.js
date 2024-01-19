import { NextResponse } from "next/server";

export function createApiResponse(statusCode, success, message, data = null) {
    return NextResponse.json({ statusCode, success, message, data }, { status: statusCode });
}
