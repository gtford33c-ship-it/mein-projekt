import { NextResponse } from "next/server";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

import { checkAdminSession } from "@/lib/auth";

import type { NextRequest } from "next/server";



const adapter = new PrismaBetterSqlite3({
  url:"./database.db",
});


const prisma = new PrismaClient({
  adapter,
});






// GET Logs laden

export async function GET(
  request: NextRequest
){


  if(!checkAdminSession(request)){

    return NextResponse.json(
      {
        error:"Nicht angemeldet",
      },
      {
        status:401,
      }
    );

  }



  try{


    const logs = await prisma.log.findMany({

      orderBy:{
        createdAt:"desc",
      },

    });



    return NextResponse.json(logs);



  }catch(error){


    console.error(error);


    return NextResponse.json(
      {
        error:"Fehler beim Laden",
      },
      {
        status:500,
      }
    );


  }


}