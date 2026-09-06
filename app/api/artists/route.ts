import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        specialty: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return Response.json({
      artists,
    });
  } catch (error) {
    console.error("Failed to fetch artists:", error);

    return Response.json(
      {
        error: "Failed to load artists",
      },
      {
        status: 500,
      }
    );
  }
}