import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { checkAdminSession } from "@/lib/auth";
import { createLog } from "@/lib/createLog";

const MAX_GALLERY_IMAGES = 30;

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error(
      "GET GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Fehler beim Laden der Galerie",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  if (!checkAdminSession(request)) {
    return NextResponse.json(
      {
        error: "Nicht angemeldet",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const count =
      await prisma.galleryImage.count();

    if (count >= MAX_GALLERY_IMAGES) {
      return NextResponse.json(
        {
          error: `Die Galerie kann maximal ${MAX_GALLERY_IMAGES} Bilder enthalten.`,
        },
        {
          status: 400,
        }
      );
    }

    const body =
      await request.json();

    const image =
      typeof body.image === "string"
        ? body.image.trim()
        : "";

    if (!image) {
      return NextResponse.json(
        {
          error: "Kein Bild angegeben",
        },
        {
          status: 400,
        }
      );
    }

    const galleryImage =
      await prisma.galleryImage.create({
        data: {
          image,
        },
      });

    await createLog(
      `Galerie-Bild hinzugefügt: ${galleryImage.id}`
    );

    return NextResponse.json(
      galleryImage,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Fehler beim Hinzufügen",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  if (!checkAdminSession(request)) {
    return NextResponse.json(
      {
        error: "Nicht angemeldet",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    const id =
      Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error: "Ungültige ID",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.galleryImage.delete({
      where: {
        id,
      },
    });

    await createLog(
      `Galerie-Bild gelöscht: ${id}`
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Fehler beim Löschen",
      },
      {
        status: 500,
      }
    );
  }
}