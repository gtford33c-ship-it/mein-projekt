import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";



export function proxy(
  request: NextRequest
){


const pathname = request.nextUrl.pathname;



console.log(
"PROXY AKTIV:",
pathname
);





// nur Admin-Bereich schützen

if(
!pathname.startsWith("/admin")
){

return NextResponse.next();

}






const session = request.cookies.get(
"admin_session"
);





if(!session){


return NextResponse.redirect(

new URL(
"/login",
request.url
)

);


}





try{


const user = JSON.parse(
session.value
);




if(
!user.id ||
!user.email
){


return NextResponse.redirect(

new URL(
"/login",
request.url
)

);


}






}catch{


return NextResponse.redirect(

new URL(
"/login",
request.url
)

);


}






return NextResponse.next();



}







export const config = {


matcher:[

"/admin/:path*"

]

};