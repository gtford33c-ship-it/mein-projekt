import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import type { NextRequest } from "next/server";

import { checkAdminSession } from "@/lib/auth";
import { createLog } from "@/lib/createLog";





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


const formData =
await request.formData();



const file =
formData.get("file") as File | null;





if(!file){


return NextResponse.json(
{
error:"Keine Datei"
},
{
status:400
}
);


}







const allowedTypes = [


"image/jpeg",

"image/png",

"image/webp"

];






if(!allowedTypes.includes(file.type)){


return NextResponse.json(
{
error:"Nur Bilder erlaubt"
},
{
status:400
}
);


}







// maximale Größe 10MB


if(file.size > 10 * 1024 * 1024){


return NextResponse.json(
{
error:"Datei zu groß"
},
{
status:400
}
);


}









const bytes =
await file.arrayBuffer();



const buffer =
Buffer.from(bytes);








const extension =
file.name.split(".").pop() || "jpg";





const filename =
`${Date.now()}-${randomUUID()}.${extension}`;






const uploadFolder =
path.join(
process.cwd(),
"public",
"uploads"
);






await mkdir(
uploadFolder,
{
recursive:true
}
);






const filepath =
path.join(
uploadFolder,
filename
);







await writeFile(
filepath,
buffer
);







const url =
`/uploads/${filename}`;







await createLog(
`Bild hochgeladen: ${filename}`
);







return NextResponse.json({

success:true,

url

});





}catch(error){



console.error(
"UPLOAD ERROR:",
error
);





return NextResponse.json(
{
error:"Upload fehlgeschlagen"
},
{
status:500
}
);


}



}