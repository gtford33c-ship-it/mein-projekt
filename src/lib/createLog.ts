import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";


const adapter = new PrismaBetterSqlite3({

  url:"./database.db",

});


const prisma = new PrismaClient({

  adapter,

});





export async function createLog(

action:string,

user:string="Admin"

){


try{


await prisma.log.create({

data:{

action,

user,

},

});



}catch(error){


console.error(
"Log Fehler:",
error
);


}



}