import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";


export default async function Home(){


return (

<main className="bg-black text-white">

<Header />

<Hero />

<Services />

<Team />

<Contact />


</main>

);


}