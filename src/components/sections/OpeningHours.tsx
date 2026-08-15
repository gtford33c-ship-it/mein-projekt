"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OpeningHours() {
  const [openingHours, setOpeningHours] = useState("");

  useEffect(() => {
    loadOpeningHours();
  }, []);

  async function loadOpeningHours() {
    try {
      const res = await fetch("/api/public/settings");

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      setOpeningHours(data.openingHours || "");
    } catch (error) {
      console.error("OPENING HOURS LOAD ERROR:", error);
    }
  }

  function renderOpeningHours() {
    if (!openingHours.trim()) {
      return (
        <p className="text-neutral-500 text-lg">
          Öffnungszeiten derzeit nicht verfügbar.
        </p>
      );
    }

    const lines = openingHours
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return (
      <div className="space-y-5">
        {lines.map((line, index) => {
          const isActivity =
            line.toLowerCase().includes("tischtennis") ||
            line.toLowerCase().includes("training") ||
            line.toLowerCase().includes("sport");

          if (isActivity) {
            return (
              <p
                key={index}
                className="text-sm md:text-base text-neutral-500"
              >
                {line}
              </p>
            );
          }

          return (
            <p
              key={index}
              className="text-neutral-300 text-xl md:text-2xl"
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <section
      id="zeiten"
      className="py-32 bg-neutral-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >

          <h2 className="text-5xl md:text-6xl font-black text-center">
            Öffnungszeiten
          </h2>

          <div
            className="
              mt-12
              bg-neutral-900
              border
              border-white/10
              rounded-3xl
              p-10
              text-center
            "
          >
            {renderOpeningHours()}
          </div>

        </motion.div>

      </div>
    </section>
  );
}