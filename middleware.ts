import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { isValidPassword } from "@/lib/isValidPassword";

export async function middleware(request: NextRequest) {
  if (await isAuthenticated(request) === false) {
    return new Response(
      "Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" }
      }
    );
  }

  return await updateSession(request);
}

// for admin check. TODO: vet this
async function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("Authorization") ||
  request.headers.get("authorization");

  if (authHeader == null) {
    return false;
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  // isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string);

  // TODO: add password to the flow and make the admin username a lot more secure
  return username === process.env.ADMIN_USERNAME &&
    await isValidPassword(password, process.env.ADMIN_HASHED_PASSWORD as string);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/admin/:path*",
  ],
};
