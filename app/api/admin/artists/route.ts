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
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim().toLowerCase();
    const bio = String(body.bio ?? "").trim();
    const specialty = String(body.specialty ?? "").trim();
    const instagram = String(body.instagram ?? "").trim();

    if (!name || !slug) {
      return Response.json(
        { error: "Artist name and slug are required." },
        { status: 400 }
      );
    }

    const existingArtist = await prisma.artist.findUnique({
      where: { slug },
    });

    if (existingArtist) {
      return Response.json(
        { error: "An artist with this slug already exists." },
        { status: 409 }
      );
    }

    const artist = await prisma.artist.create({
      data: {
        name,
        slug,
        bio: bio || null,
        specialty: specialty || null,
        instagram: instagram || null,
      },
    });

    return Response.json(
      {
        success: true,
        artist,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create artist:", error);

    return Response.json(
      { error: "Failed to create artist." },
      { status: 500 }
    );
  }
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

    const id = Number(body.id);
    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim().toLowerCase();
    const bio = String(body.bio ?? "").trim();
    const specialty = String(body.specialty ?? "").trim();
    const instagram = String(body.instagram ?? "").trim();

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Invalid artist ID." },
        { status: 400 }
      );
    }

    if (!name || !slug) {
      return Response.json(
        { error: "Artist name and slug are required." },
        { status: 400 }
      );
    }

    const existingArtist = await prisma.artist.findUnique({
      where: { id },
    });

    if (!existingArtist) {
      return Response.json(
        { error: "Artist not found." },
        { status: 404 }
      );
    }

    const slugOwner = await prisma.artist.findUnique({
      where: { slug },
    });

    if (slugOwner && slugOwner.id !== id) {
      return Response.json(
        { error: "That slug is already being used by another artist." },
        { status: 409 }
      );
    }

    const artist = await prisma.artist.update({
      where: { id },
      data: {
        name,
        slug,
        bio: bio || null,
        specialty: specialty || null,
        instagram: instagram || null,
      },
    });

    return Response.json({
      success: true,
      artist,
    });
  } catch (error) {
    console.error("Failed to update artist:", error);

    return Response.json(
      { error: "Failed to update artist." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id)) {
      return Response.json(
        { error: "Invalid artist ID." },
        { status: 400 }
      );
    }

    const artist = await prisma.artist.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            tattoos: true,
            bookings: true,
          },
        },
      },
    });

    if (!artist) {
      return Response.json(
        { error: "Artist not found." },
        { status: 404 }
      );
    }

    if (artist._count.tattoos > 0) {
      return Response.json(
        {
          error:
            "This artist has portfolio work attached. Remove or reassign those tattoos before deleting the artist.",
        },
        { status: 409 }
      );
    }

    await prisma.artist.delete({
      where: { id },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete artist:", error);

    return Response.json(
      { error: "Failed to delete artist." },
      { status: 500 }
    );
  }
}