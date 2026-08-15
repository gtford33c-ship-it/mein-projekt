import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";





export async function GET(){


try{


await prisma.$queryRaw`SELECT 1`;



const memory =
process.memoryUsage();



const usage =
Math.round(
(memory.heapUsed / memory.heapTotal) * 100
);





return NextResponse.json({

website:"online",

database:"connected",

usage,

timestamp:new Date()

});





}catch(error){


console.error(
"STATUS ERROR:",
error
);





return NextResponse.json({

website:"online",

database:"error",

usage:0,

timestamp:new Date()

});



}



}