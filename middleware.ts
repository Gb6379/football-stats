import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

console.log("Middleware rodando em:", req.nextUrl.pathname);

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/plans") ||
    pathname.startsWith("/forgot-password") ||
    pathname === "/" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
//  botei esse ignore do eslint só pq n quero usar o err kkkkkkk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",

    // validar esses depois TODO
    "/teams", 
    "/players",
    "/team/:path*",
    "/player/:path*",
  ],
};
