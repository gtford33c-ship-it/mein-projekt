import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = "gtford33c@gmail.com";
  const password = "admin123";

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.log("Admin existiert bereits.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: "Jonathan",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin erstellt:", user.email);
}

main()
  .catch((error) => {
    console.error("CREATE ADMIN ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });