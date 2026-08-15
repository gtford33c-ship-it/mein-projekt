import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("PUBLIC GALLERY ERROR:", error);

    return NextResponse.json(
      {
        error: "Galerie konnte nicht geladen werden",
      },
      {
        status: 500,
      }
    );
  }
}