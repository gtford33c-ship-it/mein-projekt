"use client";

import { motion } from "framer-motion";


export default function Reveal({
children,
className=""
}:{
children:React.ReactNode;
className?:string;
}){


return (

<motion.div

initial={{
opacity:0,
y:80
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:0.2
}}

transition={{

duration:1,

ease:[
0.22,
1,
0.36,
1
]

}}

className={className}

>

{children}

</motion.div>

);


}