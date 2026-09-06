import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      artistId,
      tattooStyle,
      preferredDate,
      preferredTime,
      message,
    } = body;
    const appointmentDate = new Date(preferredDate);

if (Number.isNaN(appointmentDate.getTime())) {
  return Response.json(
    {
      error: "Invalid appointment date.",
    },
    { status: 400 }
  );
}

const today = new Date();
today.setHours(0, 0, 0, 0);

appointmentDate.setHours(0, 0, 0, 0);

if (appointmentDate < today) {
  return Response.json(
    {
      error: "Appointment date cannot be in the past.",
    },
    { status: 400 }
  );
}

    // Basic validation
    if (!customerName || !email || !artistId || !preferredDate) {
      return Response.json(
        {
          error:
            "Name, email, artist, and preferred date are required.",
        },
        { status: 400 }
      );
    }

    // Make sure the selected artist actually exists
    const artist = await prisma.artist.findUnique({
      where: {
        id: Number(artistId),
      },
    });

    if (!artist) {
      return Response.json(
        {
          error: "Selected artist was not found.",
        },
        { status: 400 }
      );
    }
    // Prevent an artist from having two confirmed bookings
// at the same date and time.
if (preferredTime) {
  const existingBooking = await prisma.booking.findFirst({
    where: {
      artistId: Number(artistId),
      preferredDate: appointmentDate,
      preferredTime: String(preferredTime),
      status: "CONFIRMED",
    },
  });

  if (existingBooking) {
    return Response.json(
      {
        error:
          "This artist already has a confirmed booking at that date and time.",
      },
      { status: 409 }
    );
  }
}
    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        customerName: String(customerName),
        email: String(email),
        phone: phone ? String(phone) : null,
        artistId: Number(artistId),
        tattooStyle: tattooStyle ? String(tattooStyle) : null,
        preferredDate: appointmentDate,
        preferredTime: preferredTime ? String(preferredTime) : null,
        message: message ? String(message) : null,
      },
    });

    return Response.json(
      {
        success: true,
        booking: {
          id: booking.id,
          status: booking.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create booking:", error);

    return Response.json(
      {
        error: "Failed to create booking.",
      },
      { status: 500 }
    );
  }
}