import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("GET PUBLIC TEAM ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}