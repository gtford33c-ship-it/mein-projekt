"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


type Service = {

  id:number;

  title:string;

  description:string;

  image:string;

};




export default function ServicesPage(){


const router = useRouter();


const [services,setServices] = useState<Service[]>([]);


const [title,setTitle] = useState("");

const [description,setDescription] = useState("");

const [image,setImage] = useState("");

const [edit,setEdit] = useState<Service | null>(null);


const [message,setMessage] = useState("");






async function loadServices(){


const res = await fetch("/api/services");


const data = await res.json();


if(Array.isArray(data)){

setServices(data);

}


}




useEffect(()=>{

loadServices();

},[]);









async function uploadImage(e:any){


const file = e.target.files[0];


if(!file)return;



const formData = new FormData();


formData.append(
"file",
file
);



const res = await fetch(
"/api/upload",
{

method:"POST",

body:formData

}

);



const data = await res.json();



if(data.url){

setImage(data.url);

}


}









async function createService(e:React.FormEvent){


e.preventDefault();



await fetch("/api/services",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title,

description,

image

})

});



setTitle("");

setDescription("");

setImage("");

setMessage("Angebot erstellt ✅");


loadServices();


}









async function deleteService(id:number){



await fetch("/api/services",{

method:"DELETE",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id

})

});



setMessage("Gelöscht ✅");


loadServices();


}









async function updateService(e:React.FormEvent){


e.preventDefault();



if(!edit)return;



await fetch("/api/services",{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(edit)

});



setEdit(null);

setMessage("Gespeichert ✅");


loadServices();


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

⭐ Angebote

</h1>


<p className="text-slate-400 mt-2">

Freizeit, Projekte und Unterstützung verwalten

</p>







<form

onSubmit={createService}

className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4"

>


<h2 className="text-2xl font-bold">

Neues Angebot

</h2>





<input

placeholder="Titel"

value={title}

onChange={e=>setTitle(e.target.value)}

className="w-full bg-slate-800 px-5 py-3 rounded-xl"

/>





<textarea

placeholder="Beschreibung"

value={description}

onChange={e=>setDescription(e.target.value)}

className="w-full bg-slate-800 px-5 py-3 rounded-xl"

/>





<input

type="file"

onChange={uploadImage}

/>





{image && (

<img

src={image}

className="w-40 rounded-xl"

/>

)}





<button

className="bg-blue-600 px-6 py-3 rounded-xl"

>

Speichern

</button>




</form>









{edit && (

<form

onSubmit={updateService}

className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4"

>


<h2 className="text-2xl font-bold">

Bearbeiten

</h2>





<input

value={edit.title}

onChange={e=>setEdit({

...edit,

title:e.target.value

})}

className="w-full bg-slate-800 px-5 py-3 rounded-xl"

/>






<textarea

value={edit.description}

onChange={e=>setEdit({

...edit,

description:e.target.value

})}

className="w-full bg-slate-800 px-5 py-3 rounded-xl"

/>





<button

className="bg-green-600 px-6 py-3 rounded-xl"

>

Änderung speichern

</button>




</form>

)}









<div className="grid md:grid-cols-3 gap-6 mt-10">



{services.map(service=>(


<motion.div

key={service.id}

whileHover={{scale:1.03}}

className="bg-slate-900 border border-slate-800 rounded-3xl p-6"

>



{service.image && (

<img

src={service.image}

className="w-full h-48 object-cover rounded-2xl"

/>

)}





<h2 className="text-2xl font-bold mt-5">

{service.title}

</h2>




<p className="text-slate-400 mt-3">

{service.description}

</p>





<div className="flex gap-3 mt-5">


<button

onClick={()=>setEdit(service)}

className="bg-slate-700 px-4 py-2 rounded-xl"

>

✏️

</button>





<button

onClick={()=>deleteService(service.id)}

className="bg-red-600 px-4 py-2 rounded-xl"

>

🗑️

</button>


</div>




</motion.div>


))}



</div>





{message && (

<p className="mt-6 text-green-400">

{message}

</p>

)}




</main>


);


}