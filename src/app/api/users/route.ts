import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { checkAdminSession, isSuperAdmin } from "@/lib/auth";
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


const users =
await prisma.user.findMany({

orderBy:{
id:"asc"
},

select:{
id:true,
name:true,
email:true,
role:true,
createdAt:true
}

});



return NextResponse.json(users);



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


if(!isSuperAdmin(request)){


return NextResponse.json(
{
error:"Keine Berechtigung"
},
{
status:403
}
);


}



try{


const body =
await request.json();





const hashedPassword =
await bcrypt.hash(
body.password,
10
);





const user =
await prisma.user.create({

data:{


name:
body.name || "Neuer Benutzer",


email:
body.email,


password:
hashedPassword,


role:
body.role || "ADMIN",


}

});





await createLog(
`Benutzer erstellt: ${user.email}`
);





return NextResponse.json({

id:user.id,

name:user.name,

email:user.email,

role:user.role

});



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


if(!isSuperAdmin(request)){


return NextResponse.json(
{
error:"Keine Berechtigung"
},
{
status:403
}
);


}



try{


const body =
await request.json();





let data:any = {


name:
body.name,


email:
body.email,


role:
body.role,


};






// Passwort nur ändern,
// wenn eins eingegeben wurde


if(body.password){


data.password =
await bcrypt.hash(
body.password,
10
);


}






const user =
await prisma.user.update({

where:{
id:body.id
},


data

});





await createLog(
`Benutzer bearbeitet: ${user.email}`
);





return NextResponse.json({

id:user.id,

name:user.name,

email:user.email,

role:user.role

});



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


if(!isSuperAdmin(request)){


return NextResponse.json(
{
error:"Keine Berechtigung"
},
{
status:403
}
);


}



try{


const body =
await request.json();





const user =
await prisma.user.findUnique({

where:{
id:body.id
}

});





await prisma.user.delete({

where:{
id:body.id
}

});





await createLog(
`Benutzer gelöscht: ${user?.email || body.id}`
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