import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

async function isAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  return verifyAdminSession(session?.value);
}

export async function PATCH(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const address = String(body.address ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const instagram = String(body.instagram ?? "").trim();
    const whatsapp = String(body.whatsapp ?? "").trim();
    const openingHours = String(body.openingHours ?? "").trim();

    const settings = await prisma.studioSettings.upsert({
      where: {
        id: 1,
      },
      update: {
        address: address || null,
        phone: phone || null,
        email: email || null,
        instagram: instagram || null,
        whatsapp: whatsapp || null,
        openingHours: openingHours || null,
      },
      create: {
        id: 1,
        address: address || null,
        phone: phone || null,
        email: email || null,
        instagram: instagram || null,
        whatsapp: whatsapp || null,
        openingHours: openingHours || null,
      },
    });

    return Response.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Failed to update studio settings:", error);

    return Response.json(
      {
        error: "Failed to update studio settings.",
      },
      { status: 500 }
    );
  }
}