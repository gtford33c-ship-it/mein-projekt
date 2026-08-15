import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("GET PUBLIC SERVICES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}