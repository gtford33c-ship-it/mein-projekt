import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "@/generated/prisma/client";

import { createLog } from "@/lib/createLog";



const adapter = new PrismaBetterSqlite3({

  url:"./database.db",

});


const prisma = new PrismaClient({

  adapter,

});







export async function POST(request:Request){


try{



const body = await request.json();





const user = await prisma.user.findUnique({

where:{

email:body.email,

},

});






if(!user){


return NextResponse.json(

{

error:"E-Mail oder Passwort falsch"

},

{

status:401

}

);


}







const passwordCorrect = await bcrypt.compare(

body.password,

user.password

);






if(!passwordCorrect){


await createLog(

`Fehlgeschlagener Login: ${body.email}`

);



return NextResponse.json(

{

error:"E-Mail oder Passwort falsch"

},

{

status:401

}

);


}








await createLog(

`Login erfolgreich: ${user.email}`

);







const response = NextResponse.json({

success:true,


user:{


id:user.id,


name:user.name,


email:user.email,


role:user.role,


}


});







response.cookies.set(

"admin_session",

JSON.stringify({

id:user.id,

email:user.email,

role:user.role,

}),


{


httpOnly:true,


secure:false,


sameSite:"lax",


maxAge:60 * 60 * 24,


path:"/",


}



);







return response;








}catch(error){


console.error(error);



return NextResponse.json(

{

error:"Server Fehler"

},

{

status:500

}

);



}



}