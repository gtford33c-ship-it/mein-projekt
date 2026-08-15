"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";





export default function AdminPage(){


const router = useRouter();





const [status,setStatus] = useState({

website:"",
database:"",
usage:0,

});





const [adminUser,setAdminUser] = useState({

name:"",
role:"",

});





const [onlineTime,setOnlineTime] = useState(
"00h 00m 00s"
);



const [loginTime,setLoginTime] = useState<number | null>(null);










// Login prüfen

useEffect(()=>{


const user = localStorage.getItem(
"adminUser"
);


if(!user){

router.push("/login");

return;

}



const parsedUser = JSON.parse(user);


setAdminUser(parsedUser);




const time = localStorage.getItem(
"loginTime"
);



if(time){

setLoginTime(
Number(time)
);

}



},[router]);









// Status laden

useEffect(()=>{


async function loadStatus(){


try{


const res = await fetch("/api/status");


if(!res.ok){

return;

}


const data = await res.json();


setStatus(data);



}catch(error){


console.error(error);


}



}



loadStatus();



const interval = setInterval(
loadStatus,
10000
);



return ()=>clearInterval(interval);



},[]);











// Timer

useEffect(()=>{


if(!loginTime){

return;

}



const interval = setInterval(()=>{


const diff = Date.now() - loginTime;



const seconds = Math.floor(diff / 1000) % 60;

const minutes = Math.floor(diff / 60000) % 60;

const hours = Math.floor(diff / 3600000);




setOnlineTime(

`${hours.toString().padStart(2,"0")}h ${minutes
.toString()
.padStart(2,"0")}m ${seconds
.toString()
.padStart(2,"0")}s`

);



},1000);





return ()=>clearInterval(interval);



},[loginTime]);












const cards = [

{

title:"Benutzer",

icon:"👤",

description:"Benutzer verwalten",

url:"/admin/users"

},


{

title:"Einstellungen",

icon:"⚙️",

description:"Website, Kontakt und Rechtliches",

url:"/admin/settings"

},


{

title:"Logs",

icon:"📋",

description:"Admin Aktivitäten",

url:"/admin/logs"

},


];













async function logout(){


try{


await fetch(
"/api/auth/logout",
{

method:"POST",

}

);



}catch(error){


console.error(error);


}






localStorage.removeItem(
"adminUser"
);


localStorage.removeItem(
"loginTime"
);



router.replace(
"/login"
);



}














return (



<main className="min-h-screen bg-slate-950 text-white flex">





<aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">





<h1 className="text-4xl font-bold">

TRINI

</h1>


<p className="text-slate-400 mt-2">

Adminbereich

</p>







<div className="mt-10 bg-slate-800 rounded-3xl p-5">



<p className="text-slate-400 text-sm">

Angemeldet als

</p>


<h2 className="text-xl font-bold mt-2">

{adminUser.name || "Admin"}

</h2>





<p className="text-slate-400 text-sm mt-5">

Status

</p>


<p className="text-blue-400 font-bold">

{adminUser.role || "ADMIN"}

</p>





<p className="text-slate-400 text-sm mt-5">

Angemeldet seit

</p>


<p className="font-bold">

{onlineTime}

</p>





</div>









<button

onClick={logout}

className="mt-auto bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold"

>

🚪 Abmelden

</button>







</aside>









<section className="flex-1 p-8 md:p-12">





<h2 className="text-4xl font-bold">

Dashboard

</h2>



<p className="text-slate-400 mt-2">

Übersicht deiner Website

</p>









<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">







{cards.map(card=>(


<motion.div

key={card.title}

whileHover={{scale:1.03}}

className="bg-slate-900 border border-slate-800 rounded-3xl p-6"

>



<div className="text-5xl">

{card.icon}

</div>



<h3 className="text-2xl font-bold mt-5">

{card.title}

</h3>



<p className="text-slate-400 mt-2">

{card.description}

</p>





<button

onClick={()=>router.push(card.url)}

className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"

>

Öffnen

</button>





</motion.div>


))}









<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">



<div className="text-5xl">

🟢

</div>



<h3 className="text-2xl font-bold mt-5">

Webseiten Status

</h3>







<div className="mt-5 space-y-3">







<div className="bg-slate-800 rounded-xl p-4">


<p className="text-slate-400 text-sm">

Webseite

</p>


<p className="font-bold text-green-400">

{status.website === "online"

?

"🟢 Online"

:

"🔴 Offline"}

</p>



</div>








<div className="bg-slate-800 rounded-xl p-4">


<p className="text-slate-400 text-sm">

Datenbank

</p>


<p className="font-bold text-green-400">

{status.database === "connected"

?

"🟢 Verbunden"

:

"🔴 Fehler"}

</p>



</div>







<div className="bg-slate-800 rounded-xl p-4">


<p className="text-slate-400 text-sm">

Auslastung

</p>


<p className="font-bold">

{status.usage}%

</p>



</div>








</div>






</div>









</div>







</section>







</main>


);


}