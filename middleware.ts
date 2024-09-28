//* runs before every route, can specify which paths with matcher (e.g. this chunk of code will be on every page.tsx)
//* use cases: read and set cookies, auth, server-side analytics, redirect based on geolocation, etc.

//! Always needs to produce a response: redirect to a route, or send a response directly(Usually JSON)

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log("Middleware ran");

//   //* will always redirect to /scheduleV2
//   return NextResponse.redirect(new URL("/scheduleV2", request.url));
// }

import { auth } from "@/app/_lib/auth";
import { pages } from "next/dist/build/templates/app-page";
import { redirect } from "next/dist/server/api-utils";

export const middleware = auth;

export const config = {
  //* specify which paths the middleware should run on
  matcher: [
    "/schedule",
    "/scheduleV2",
    "/staff",
    "/profile",
    "/settings",
    "/events",
  ],
};
