"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/public/team")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch(console.error);
  }, []);

  return (
    <section
      id="team"
      className="py-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: false,
            amount: 0.2
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          className="text-5xl md:text-6xl font-black text-center"
        >
          Unser Team
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {members.map((member, index) => (

            <motion.div
              key={member.id}
              initial={{
                opacity: 0,
                y: 50
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: false,
                amount: 0.2
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1
              }}
              className="overflow-hidden rounded-3xl bg-neutral-900 border border-white/10"
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