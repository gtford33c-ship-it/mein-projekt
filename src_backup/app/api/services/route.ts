import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { checkAdminSession } from "@/lib/auth";
import { createLog } from "@/lib/createLog";





export async function GET(
request:NextRequest
){


if(!checkAdminSession(request)){


return NextResponse.json(
{
error:"Nicht angemeldet"
},
{
status:401
}
);


}



try{


const services =
await prisma.service.findMany({

orderBy:{
id:"asc"
}

});



return NextResponse.json(services);



}catch(error){


console.error(error);



return NextResponse.json(
{
error:"Fehler beim Laden"
},
{
status:500
}
);


}



}









export async function POST(
request:NextRequest
){


if(!checkAdminSession(request)){


return NextResponse.json(
{
error:"Nicht angemeldet"
},
{
status:401
}
);


}



try{


const body =
await request.json();





const service =
await prisma.service.create({

data:{


title:
body.title || "Neues Angebot",


description:
body.description || "",


image:
body.image || "",


}

});




await createLog(
`Angebot erstellt: ${service.title}`
);




return NextResponse.json(service);



}catch(error){


console.error(error);



return NextResponse.json(
{
error:"Fehler beim Erstellen"
},
{
status:500
}
);


}



}









export async function PUT(
request:NextRequest
){


if(!checkAdminSession(request)){


return NextResponse.json(
{
error:"Nicht angemeldet"
},
{
status:401
}
);


}



try{


const body =
await request.json();





const service =
await prisma.service.update({

where:{
id:body.id
},


data:{


title:
body.title,


description:
body.description,


image:
body.image ?? "",


}

});





await createLog(
`Angebot bearbeitet: ${service.title}`
);




return NextResponse.json(service);



}catch(error){


console.error(error);



return NextResponse.json(
{
error:"Fehler beim Bearbeiten"
},
{
status:500
}
);


}



}









export async function DELETE(
request:NextRequest
){


if(!checkAdminSession(request)){


return NextResponse.json(
{
error:"Nicht angemeldet"
},
{
status:401
}
);


}



try{


const body =
await request.json();





const service =
await prisma.service.findUnique({

where:{
id:body.id
}

});





await prisma.service.delete({

where:{
id:body.id
}

});





await createLog(
`Angebot gelöscht: ${service?.title || body.id}`
);





return NextResponse.json({

success:true

});



}catch(error){


console.error(error);



return NextResponse.json(
{
error:"Fehler beim Löschen"
},
{
status:500
}
);


}



}