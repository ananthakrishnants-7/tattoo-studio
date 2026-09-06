import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // -------------------------
  // Artists
  // -------------------------

  const alex = await prisma.artist.upsert({
    where: { slug: "alex-morgan" },
    update: {},
    create: {
      name: "Alex Morgan",
      slug: "alex-morgan",
      bio: "Specializing in bold blackwork, geometric compositions, and heavy contrast.",
      specialty: "Blackwork",
      instagram: "https://instagram.com",
      image: null,
    },
  });

  const maya = await prisma.artist.upsert({
    where: { slug: "maya-chen" },
    update: {},
    create: {
      name: "Maya Chen",
      slug: "maya-chen",
      bio: "Fine line specialist creating delicate botanical pieces and intricate details.",
      specialty: "Fine Line",
      instagram: "https://instagram.com",
      image: null,
    },
  });

  const ryan = await prisma.artist.upsert({
    where: { slug: "ryan-cole" },
    update: {},
    create: {
      name: "Ryan Cole",
      slug: "ryan-cole",
      bio: "Traditional and illustrative tattoo artist focused on timeless designs.",
      specialty: "Traditional",
      instagram: "https://instagram.com",
      image: null,
    },
  });

  // -------------------------
  // Tattoos
  // -------------------------

  const tattoos = [
    {
      title: "Blackwork Study",
      description:
        "A study in bold shapes, negative space, and high-contrast blackwork.",
      style: "Blackwork",
      artistId: alex.id,
    },
    {
      title: "Geometric Wolf",
      description:
        "A geometric interpretation combining sharp forms with organic movement.",
      style: "Geometric",
      artistId: alex.id,
    },
    {
      title: "Fine Line Rose",
      description:
        "A delicate rose built with precise fine-line details and subtle shading.",
      style: "Fine Line",
      artistId: maya.id,
    },
    {
      title: "Botanical Study",
      description:
        "An intricate botanical composition inspired by natural forms.",
      style: "Fine Line",
      artistId: maya.id,
    },
    {
      title: "Traditional Eagle",
      description:
        "A classic eagle design inspired by traditional American tattooing.",
      style: "Traditional",
      artistId: ryan.id,
    },
    {
      title: "Old School Dagger",
      description:
        "A bold traditional dagger design with strong lines and classic styling.",
      style: "Traditional",
      artistId: ryan.id,
    },
  ];

  for (const tattoo of tattoos) {
    const existingTattoo = await prisma.tattoo.findFirst({
      where: {
        title: tattoo.title,
        artistId: tattoo.artistId,
      },
    });

    if (existingTattoo) {
      await prisma.tattoo.update({
        where: { id: existingTattoo.id },
        data: tattoo,
      });
    } else {
      await prisma.tattoo.create({
        data: tattoo,
      });
    }
  }

  // -------------------------
  // Studio Settings
  // -------------------------

  await prisma.studioSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      address: "123 Main Street, Your City",
      phone: "+91 98765 43210",
      email: "hello@inkstudio.com",
      instagram: "https://instagram.com",
      whatsapp: "+919876543210",
      openingHours: "Monday - Saturday: 10:00 AM - 8:00 PM",
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });