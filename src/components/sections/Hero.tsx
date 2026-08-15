"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Settings = {
  homeTitle: string;
  homeSubtitle: string;
  homeImage: string;
};

export default function Hero() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error);
  }, []);

  if (!settings) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-black text-white"
      >
        Lade...
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      <img
        src={settings.homeImage}
        alt={settings.homeTitle}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-6">

        <motion.h1
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-6xl md:text-8xl font-black tracking-tight"
        >
          {settings.homeTitle}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-8 text-xl md:text-2xl text-neutral-200"
        >
          {settings.homeSubtitle}
        </motion.p>

        <motion.a
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          href="#angebote"
          className="inline-flex mt-10 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition"
        >
          Angebote entdecken
        </motion.a>

      </div>
    </section>
  );
}