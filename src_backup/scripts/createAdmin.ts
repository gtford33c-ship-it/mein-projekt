import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcrypt";


const adapter = new PrismaBetterSqlite3({
  url: "./database.db",
});


const prisma = new PrismaClient({
  adapter,
});


async function main() {

  const password = await bcrypt.hash(
    "Admin123!",
    10
  );


  const admin = await prisma.user.create({

    data: {

      name: "Trini Hauptadmin",

      email: "admin@trini.de",

      password,

      role: "SUPERADMIN"

    }

  });


  console.log("Admin erstellt:");
  console.log(admin.email);

}


main()
.catch((error) => {
  console.error(error);
})
.finally(async () => {
  await prisma.$disconnect();
});