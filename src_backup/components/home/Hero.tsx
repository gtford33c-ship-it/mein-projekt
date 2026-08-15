"use client";

import { motion } from "framer-motion";

export default function Hero(){

return (

<section
id="home"
className="min-h-screen flex items-center justify-center bg-black text-white px-6"
>

<div className="text-center">


<motion.h1
initial={{opacity:0,y:100}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-6xl md:text-8xl font-black tracking-tight"
>

TRINI

</motion.h1>


<motion.p
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{
duration:0.8,
delay:0.2
}}
className="mt-8 text-xl md:text-2xl text-neutral-300"
>

Jugendtreff neu erleben.

</motion.p>



<motion.a
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.8}}
href="#angebote"
className="inline-flex mt-10 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition"
>

Angebote entdecken

</motion.a>


</div>

</section>

);

}