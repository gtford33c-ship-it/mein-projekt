import { NextResponse } from "next/server";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";


const adapter = new PrismaBetterSqlite3({

url:"./database.db",

});


const prisma = new PrismaClient({

adapter,

});




export async function GET(){


try{


let settings = await prisma.siteSettings.findFirst();



if(!settings){


settings = await prisma.siteSettings.create({

data:{}

});


}



return NextResponse.json(settings);



}catch(error){


console.error(error);



return NextResponse.json(

{
error:"Fehler"
},

{
status:500
}

);


}


}