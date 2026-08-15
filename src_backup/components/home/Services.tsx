"use client";

import { motion } from "framer-motion";


const services = [
{
title:"Treffpunkt",
text:"Ein Ort zum Ankommen, Austauschen und Zeit verbringen."
},
{
title:"Aktivitäten",
text:"Gemeinsame Aktionen, Projekte und abwechslungsreiche Angebote."
},
{
title:"Unterstützung",
text:"Begleitung und Hilfe für Jugendliche in verschiedenen Situationen."
}
];


export default function Services(){

return(

<section
id="angebote"
className="py-32 bg-neutral-950"
>

<div className="max-w-7xl mx-auto px-6">


<motion.div
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
>

<h2 className="text-5xl md:text-6xl font-black">
Angebote
</h2>


<p className="mt-5 text-neutral-400 text-xl max-w-2xl">
Entdecke, was TRINI alles bietet.
</p>

</motion.div>



<div className="grid md:grid-cols-3 gap-8 mt-16">


{
services.map((service,index)=>(

<motion.div
key={service.title}
initial={{opacity:0,y:80}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*0.15}}
whileHover={{y:-10}}
className="bg-neutral-900 border border-white/10 rounded-3xl p-8"
>


<h3 className="text-3xl font-bold">
{service.title}
</h3>


<p className="mt-5 text-neutral-400 leading-relaxed">
{service.text}
</p>


</motion.div>

))
}


</div>


</div>


</section>

);

}