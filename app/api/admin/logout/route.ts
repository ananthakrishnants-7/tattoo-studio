import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/adminAuth";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({
    success: true,
  });
}