import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  COOKIE_NAME,
  SESSION_DURATION,
  createAdminSession,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password;

    if (!password || typeof password !== "string") {
      return Response.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminPasswordHash) {
      console.error("ADMIN_PASSWORD_HASH is not configured.");

      return Response.json(
        { error: "Admin authentication is not configured." },
        { status: 500 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      adminPasswordHash
    );

    if (!passwordMatches) {
      return Response.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    const session = createAdminSession();

    const response = Response.json({
      success: true,
    });

    response.headers.set(
      "Set-Cookie",
      `${COOKIE_NAME}=${session}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${SESSION_DURATION}; Secure=${process.env.NODE_ENV === "production"}`
    );

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);

    return Response.json(
      { error: "Login failed." },
      { status: 500 }
    );
  }
}