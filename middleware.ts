// import { getToken } from "next-auth/jwt";
// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// export async function middleware(request: NextRequest, _next: NextFetchEvent) {
//   const { pathname } = request.nextUrl;
//   const protectedPaths = ["/admin/:path*", "/user/:path*"];
//   const matchesProtectedPath = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );

//   if (matchesProtectedPath) {
//     const token = await getToken({ req: request });
//     if (!token) {
//       const url = new URL(`/login`, request.url);
//       url.searchParams.set("callbackUrl ", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     // if (token.role !== "admin") {
//     //   const url = new URL(`/403`, request.url);
//     //   return NextResponse.rewrite(url);
//     // }
//   }

//   return NextResponse.next();
// }

// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("req", req.nextauth.token.role);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl ", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token?.role !== "user"
    ) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl ", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
