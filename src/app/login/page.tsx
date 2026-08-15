"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";





export default function LoginPage(){


const router = useRouter();



const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");

const [loading,setLoading] = useState(false);








// prüfen ob bereits eingeloggt

useEffect(()=>{


async function checkSession(){


try{


const res = await fetch(
"/api/auth/session"
);



if(res.ok){


router.replace("/admin");


}


}catch{


}



}



checkSession();



},[router]);









async function handleLogin(
e:React.FormEvent
){


e.preventDefault();



setError("");

setLoading(true);




try{


const res = await fetch(
"/api/auth/login",
{

method:"POST",

headers:{

"Content-Type":"application/json",

},


body:JSON.stringify({

email,

password,

}),


}

);





const data = await res.json();





if(!res.ok){


setError(

data.error ||
"Login fehlgeschlagen"

);


setLoading(false);


return;

}







localStorage.setItem(

"adminUser",

JSON.stringify(
data.user
)

);



localStorage.setItem(

"loginTime",

Date.now().toString()

);






router.replace(
"/admin"
);





}catch{


setError(
"Server nicht erreichbar"
);



}finally{


setLoading(false);


}




}










return (


<main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">





<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="w-full max-w-md"

>





<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">





<h1 className="text-5xl text-center font-bold text-white">

TRINI

</h1>



<p className="text-center text-slate-400 mt-3">

Admin Login

</p>








<form

onSubmit={handleLogin}

className="mt-8 space-y-5"

>







<div>


<label className="text-slate-300">

E-Mail

</label>



<input

type="email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="w-full mt-2 bg-slate-800 text-white rounded-xl px-4 py-3"

placeholder="admin@trini.de"

required

/>


</div>









<div>


<label className="text-slate-300">

Passwort

</label>



<input

type="password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

className="w-full mt-2 bg-slate-800 text-white rounded-xl px-4 py-3"

placeholder="********"

required

/>


</div>








{error && (

<p className="text-red-400 text-center">

{error}

</p>

)}









<button

disabled={loading}

className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-3 rounded-xl font-bold text-white"

>


{

loading

?

"Anmelden..."

:

"Anmelden"

}



</button>








</form>







</div>






</motion.div>






</main>


);


}