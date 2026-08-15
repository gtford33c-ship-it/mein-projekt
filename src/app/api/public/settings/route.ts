import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET PUBLIC SETTINGS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}