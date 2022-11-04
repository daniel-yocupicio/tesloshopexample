import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dbProducts } from "./database";

export async function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {}