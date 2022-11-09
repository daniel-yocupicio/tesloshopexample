import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { jwt } from "./utils";

export async function middleware(request: NextRequest) {

    // En la actualización hay cosas de nodeTest.js que no funcionan en la parte del cliente 
    // entonces los middleware se ejecutan en la parte del cliente y al utilizar jwt
    // sale un error al implementarlo, para esto hay dos soluciones que son: 

    // 1- implementar la libreria jose [import * as jose from 'jose']
    // 2- teniendo en cuenta que es en la parte del cliente se podria hacer una petición 
    //    a un endpoint que te retorne si el jsonwebtoken es valido y con eso trabajar la redirección. 
    //
    // if(request.nextUrl.pathname.startsWith('/checkout/')) {
    //     const token = request.cookies.get('token') || '';
    //     let isValidToken = false;    

    //     try {
    //         await jwt.isValidToken(token);  <-- no sirve

    //         await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET));
    //         isValidToken = true;

    //         return NextResponse.next();   
    //     } catch (e) {
    //         isValidToken = false;
    //     }

//         if (!isValidToken) {
//             const { pathname } = request.nextUrl;
//             return NextResponse.redirect(
//                 new URL(`/auth/login?redirect=${pathname}`, request.url)
//             );
//         }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*']
}