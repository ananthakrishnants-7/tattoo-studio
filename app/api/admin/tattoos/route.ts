import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

async function isAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  return verifyAdminSession(session?.value);
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const style = String(body.style ?? "").trim();
    const image = String(body.image ?? "").trim();
    const artistId = Number(body.artistId);

    if (!title || !style || !Number.isInteger(artistId)) {
      return Response.json(
        { error: "Title, style, and artist are required." },
        { status: 400 }
      );
    }

    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      return Response.json(
        { error: "Selected artist was not found." },
        { status: 400 }
      );
    }

    const tattoo = await prisma.tattoo.create({
      data: {
        title,
        description: description || null,
        style,
        image: image || null,
        artistId,
      },
    });

    return Response.json(
      { success: true, tattoo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create tattoo:", error);

    return Response.json(
      { error: "Failed to create tattoo." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();

    const id = Number(body.id);
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const style = String(body.style ?? "").trim();
    const image = String(body.image ?? "").trim();
    const artistId = Number(body.artistId);

    if (
      !Number.isInteger(id) ||
      !title ||
      !style ||
      !Number.isInteger(artistId)
    ) {
      return Response.json(
        { error: "Invalid tattoo information." },
        { status: 400 }
      );
    }

    const existingTattoo = await prisma.tattoo.findUnique({
      where: { id },
    });

    if (!existingTattoo) {
      return Response.json(
        { error: "Tattoo not found." },
        { status: 404 }
      );
    }

    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      return Response.json(
        { error: "Selected artist was not found." },
        { status: 400 }
      );
    }

    const tattoo = await prisma.tattoo.update({
      where: { id },
      data: {
        title,
        description: description || null,
        style,
        image: image || null,
        artistId,
      },
    });

    return Response.json({
      success: true,
      tattoo,
    });
  } catch (error) {
    console.error("Failed to update tattoo:", error);

    return Response.json(
      { error: "Failed to update tattoo." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Invalid tattoo ID." },
        { status: 400 }
      );
    }

    const tattoo = await prisma.tattoo.findUnique({
      where: { id },
    });

    if (!tattoo) {
      return Response.json(
        { error: "Tattoo not found." },
        { status: 404 }
      );
    }

    await prisma.tattoo.delete({
      where: { id },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete tattoo:", error);

    return Response.json(
      { error: "Failed to delete tattoo." },
      { status: 500 }
    );
  }
}