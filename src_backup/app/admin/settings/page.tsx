"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function SettingsPage(){


const router = useRouter();



const [title,setTitle] = useState("");
const [subtitle,setSubtitle] = useState("");
const [image,setImage] = useState("");



const [phone1,setPhone1] = useState("");
const [phone2,setPhone2] = useState("");
const [phone3,setPhone3] = useState("");

const [email,setEmail] = useState("");



const [addressLine1,setAddressLine1] = useState("");
const [addressLine2,setAddressLine2] = useState("");
const [addressLine3,setAddressLine3] = useState("");



const [openingHours,setOpeningHours] = useState("");



const [instagramUrl,setInstagramUrl] = useState("");



const [impressumText,setImpressumText] = useState("");

const [datenschutzText,setDatenschutzText] = useState("");



const [message,setMessage] = useState("");








useEffect(()=>{

loadSettings();

},[]);







async function loadSettings(){


const res = await fetch("/api/settings");


const data = await res.json();




setTitle(data.homeTitle || "");

setSubtitle(data.homeSubtitle || "");

setImage(data.homeImage || "");




setPhone1(data.phone1 || "");

setPhone2(data.phone2 || "");

setPhone3(data.phone3 || "");



setEmail(data.email || "");



setAddressLine1(data.addressLine1 || "");

setAddressLine2(data.addressLine2 || "");

setAddressLine3(data.addressLine3 || "");



setOpeningHours(
data.openingHours || ""
);



setInstagramUrl(
data.instagramUrl || ""
);



setImpressumText(
data.impressumText || ""
);



setDatenschutzText(
data.datenschutzText || ""
);



}









async function uploadImage(e:any){


const file=e.target.files[0];


if(!file)return;



const formData=new FormData();


formData.append(
"file",
file
);




const res=await fetch("/api/upload",{

method:"POST",

body:formData

});



const data=await res.json();



if(data.url){

setImage(data.url);

}



}









async function save(){



await fetch("/api/settings",{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({



homeTitle:title,

homeSubtitle:subtitle,

homeImage:image,



phone1,

phone2,

phone3,



email,



addressLine1,

addressLine2,

addressLine3,



openingHours,



instagramUrl,



impressumText,

datenschutzText



})

});



setMessage("Gespeichert ✅");



}









return (

<main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">





<button

onClick={()=>router.push("/admin")}

className="bg-slate-800 px-5 py-3 rounded-xl"

>

← Dashboard

</button>






<h1 className="text-4xl font-bold mt-8">

⚙️ Einstellungen

</h1>



<p className="text-slate-400 mt-2">

Website verwalten

</p>









<div className="grid md:grid-cols-2 gap-6 mt-10">







<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

🏠 Startseite

</h2>



<input

value={title}

onChange={e=>setTitle(e.target.value)}

placeholder="Titel"

className="mt-6 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={subtitle}

onChange={e=>setSubtitle(e.target.value)}

placeholder="Untertitel"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

type="file"

onChange={uploadImage}

className="mt-5"

/>





{image && (

<img

src={image}

className="mt-5 rounded-2xl h-48 w-full object-cover"

/>

)}



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

📞 Kontakt

</h2>





<input

value={phone1}

onChange={e=>setPhone1(e.target.value)}

placeholder="Telefon 1"

className="mt-6 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={phone2}

onChange={e=>setPhone2(e.target.value)}

placeholder="Telefon 2"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={phone3}

onChange={e=>setPhone3(e.target.value)}

placeholder="Telefon 3"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={email}

onChange={e=>setEmail(e.target.value)}

placeholder="E-Mail"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={addressLine1}

onChange={e=>setAddressLine1(e.target.value)}

placeholder="Adresse Zeile 1"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={addressLine2}

onChange={e=>setAddressLine2(e.target.value)}

placeholder="Adresse Zeile 2"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>





<input

value={addressLine3}

onChange={e=>setAddressLine3(e.target.value)}

placeholder="Adresse Zeile 3"

className="mt-4 w-full bg-slate-800 rounded-xl px-5 py-3"

/>



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

🕒 Öffnungszeiten

</h2>



<textarea

value={openingHours}

onChange={e=>setOpeningHours(e.target.value)}

className="mt-6 w-full bg-slate-800 rounded-xl px-5 py-3 h-32"

/>



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

📱 Instagram

</h2>



<input

value={instagramUrl}

onChange={e=>setInstagramUrl(e.target.value)}

placeholder="Instagram Link"

className="mt-6 w-full bg-slate-800 rounded-xl px-5 py-3"

/>



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

👥 Team

</h2>



<p className="text-slate-400 mt-3">

Teammitglieder verwalten

</p>




<button

onClick={()=>router.push("/admin/team")}

className="mt-5 bg-blue-600 px-6 py-3 rounded-xl"

>

Team öffnen

</button>



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

⭐ Angebote

</h2>



<p className="text-slate-400 mt-3">

Angebote verwalten

</p>




<button

onClick={()=>router.push("/admin/services")}

className="mt-5 bg-blue-600 px-6 py-3 rounded-xl"

>

Angebote öffnen

</button>



</section>









<section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">


<h2 className="text-2xl font-bold">

⚖️ Rechtliches

</h2>




<textarea

value={impressumText}

onChange={e=>setImpressumText(e.target.value)}

placeholder="Impressum"

className="mt-5 w-full bg-slate-800 rounded-xl p-4 h-32"

/>





<textarea

value={datenschutzText}

onChange={e=>setDatenschutzText(e.target.value)}

placeholder="Datenschutz"

className="mt-5 w-full bg-slate-800 rounded-xl p-4 h-32"

/>



</section>







</div>







<button

onClick={save}

className="mt-10 bg-green-600 px-8 py-4 rounded-xl font-bold"

>

Alles speichern

</button>







{message && (

<p className="mt-5 text-green-400">

{message}

</p>

)}





</main>

);


}