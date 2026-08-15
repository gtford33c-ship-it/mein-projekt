"use client";

import { motion } from "framer-motion";

const members = [
  {
    name: "Michael Zentgraf",
    role: "Betreuer",
    image: "/images/team/michael.jpg",
  },
  {
    name: "Franziska Lumpe",
    role: "Betreuerin",
    image: "/images/team/franziska.jpg",
  },
  {
    name: "Jan Goldammer",
    role: "Teamleitung",
    image: "/images/team/jan.jpg",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-32 bg-black"
    >

      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-center"
        >
          Unser Team
        </motion.h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 justify-items-center">

          {members.map((member,index)=>(

            <motion.div
              key={member.name}
              initial={{ opacity:0, y:60 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:index * 0.1 }}
              className="w-full max-w-sm overflow-hidden rounded-3xl bg-neutral-900 border border-white/10"
            >

              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {member.name}
                </h3>

                <p className="text-neutral-400 mt-2">
                  {member.role}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}