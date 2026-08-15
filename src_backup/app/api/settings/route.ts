import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { checkAdminSession } from "@/lib/auth";





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


let settings =
await prisma.siteSettings.findFirst();




if(!settings){


settings =
await prisma.siteSettings.create({

data:{}

});


}





return NextResponse.json(settings);



}catch(error){


console.error(
"GET SETTINGS ERROR:",
error
);



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





let settings =
await prisma.siteSettings.findFirst();





const data = {


homeTitle:
body.homeTitle ?? "",


homeSubtitle:
body.homeSubtitle ?? "",


homeImage:
body.homeImage ?? "",




phone1:
body.phone1 ?? "",


phone2:
body.phone2 ?? "",


phone3:
body.phone3 ?? "",





email:
body.email ?? "",





addressLine1:
body.addressLine1 ?? "",


addressLine2:
body.addressLine2 ?? "",


addressLine3:
body.addressLine3 ?? "",





openingHours:
body.openingHours ?? "",





instagramUrl:
body.instagramUrl ?? "",





impressumText:
body.impressumText ?? "",


datenschutzText:
body.datenschutzText ?? "",


};






if(settings){


settings =
await prisma.siteSettings.update({

where:{
id:settings.id
},


data

});



}else{


settings =
await prisma.siteSettings.create({

data

});


}







return NextResponse.json(settings);



}catch(error){


console.error(
"PUT SETTINGS ERROR:",
error
);




return NextResponse.json(
{
error:"Fehler beim Speichern"
},
{
status:500
}
);


}



}