import { prisma } from "@/lib/prisma";

export async function createLog(
  action: string,
  user: string = "Admin"
) {
  try {
    await prisma.log.create({
      data: {
        action,
        user,
      },
    });
  } catch (error) {
    console.error("CREATE LOG ERROR:", error);
  }
}