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


const team =
await prisma.teamMember.findMany({

orderBy:{
id:"asc"
}

});


return NextResponse.json(team);



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



const member =
await prisma.teamMember.create({

data:{


name:
body.name || "Neues Teammitglied",


position:
body.position || "Mitarbeiter",


description:
body.description || "",


image:
body.image || "",


}

});



await createLog(
`Teammitglied erstellt: ${member.name}`
);



return NextResponse.json(member);



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



const member =
await prisma.teamMember.update({

where:{
id:body.id
},


data:{


name:body.name,

position:body.position,

description:body.description,

image:body.image ?? "",


}

});



await createLog(
`Teammitglied bearbeitet: ${member.name}`
);



return NextResponse.json(member);



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



const member =
await prisma.teamMember.findUnique({

where:{
id:body.id
}

});



await prisma.teamMember.delete({

where:{
id:body.id
}

});



await createLog(
`Teammitglied gelöscht: ${member?.name || body.id}`
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