import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/adminAuth";

const validStatuses = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
] as const;

type BookingStatus = (typeof validStatuses)[number];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!verifyAdminSession(session?.value)) {
      return Response.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // Get booking ID from the URL
    const { id } = await context.params;
    const bookingId = Number(id);

    if (!Number.isInteger(bookingId)) {
      return Response.json(
        { error: "Invalid booking ID." },
        { status: 400 }
      );
    }

    // Read requested status
    const body = await request.json();
    const status = body.status as BookingStatus;

    // Validate status
    if (!validStatuses.includes(status)) {
      return Response.json(
        { error: "Invalid booking status." },
        { status: 400 }
      );
    }

    // Make sure booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!existingBooking) {
      return Response.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    // Update booking status
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status,
      },
    });

    return Response.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Failed to update booking:", error);

    return Response.json(
      {
        error: "Failed to update booking.",
      },
      { status: 500 }
    );
  }
}