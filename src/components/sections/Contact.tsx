"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Settings = {
  phone1: string;
  phone2: string;
  phone3: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
};

export default function Contact() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      });
  }, []);

  return (
    <section
      id="kontakt"
      className="py-32 bg-neutral-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          className="text-5xl md:text-6xl font-black"
        >
          Kontakt
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut"
          }}
          className="mt-8 text-neutral-400 text-xl"
        >
          Wir freuen uns auf deinen Besuch.
        </motion.p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0,
              ease: "easeOut"
            }}
            className="bg-neutral-900 rounded-3xl p-8 border border-white/10"
          >
            <h3 className="font-bold text-xl">
              Telefon
            </h3>

            <p className="mt-4 text-neutral-400">
              {settings?.phone1}
              <br />
              {settings?.phone2}
              <br />
              {settings?.phone3}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut"
            }}
            className="bg-neutral-900 rounded-3xl p-8 border border-white/10"
          >
            <h3 className="font-bold text-xl">
              E-Mail
            </h3>

            <p className="mt-4 text-neutral-400">
              {settings?.email}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut"
            }}
            className="bg-neutral-900 rounded-3xl p-8 border border-white/10"
          >
            <h3 className="font-bold text-xl">
              Adresse
            </h3>

            <p className="mt-4 text-neutral-400">
              {settings?.addressLine1}
              <br />
              {settings?.addressLine2}
              <br />
              {settings?.addressLine3}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}