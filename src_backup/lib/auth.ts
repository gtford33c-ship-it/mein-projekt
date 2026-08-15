import { NextRequest } from "next/server";


export function getAdminUser(
  request: NextRequest
){

  const session =
    request.cookies.get("admin_session");


  if(!session){

    return null;

  }


  try{


    const user =
      JSON.parse(session.value);


    if(
      !user.id ||
      !user.email
    ){

      return null;

    }


    return user;


  }catch{

    return null;

  }

}




export function checkAdminSession(
  request: NextRequest
){

  return getAdminUser(request) !== null;

}




export function isSuperAdmin(
  request: NextRequest
){

  const user =
    getAdminUser(request);


  if(!user){

    return false;

  }


  return user.role === "SUPERADMIN";

}