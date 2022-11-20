import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
// import * as jose from 'jose';

interface User {
  _id: string;
  email: string;
  role: string;
  name: string;
}

// Los middlewares a veces no funcionan con paquetes de nodejs.
export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith("/admin")) {
      const session = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET || ''});

      if( !session ){
        const { pathname } = request.nextUrl;

        return NextResponse.redirect(
          new URL("/auth/login?p=" + pathname, request.url)
        );
      }

      const validRoles = ['admin','super-user','SEO'];
      const user : User = session.user as User;
      
      if(!validRoles.includes(user.role)){
        return NextResponse.redirect(
          new URL('/', request.url)
        );
      }

    }

    if (request.nextUrl.pathname.startsWith("/checkout")) {
        const session = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET || ''});

        if( !session ){
          const { pathname } = request.nextUrl;

          return NextResponse.redirect(
            new URL("/auth/login?p=" + pathname, request.url)
          );
        }

        return NextResponse.next();
        // const token = request.cookies.get("token");
     
        // try {
        //   await jose.jwtVerify(
        //     token || "",
        //     new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
        //   );
          
        //   return NextResponse.next();
        // } catch (error) {
        //   //console.error(`JWT Invalid or not signed in`, { error });
        //   const { protocol, host, pathname } = request.nextUrl;
          
        //  // console.log(`${protocol}//${host}/auth/login?p=${pathname.toString()}`);
          


        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*', '/admin/:path*']
}