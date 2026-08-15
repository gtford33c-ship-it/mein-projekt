"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Settings = {
  phone1?: string;
  phone2?: string;
  phone3?: string;

  email?: string;

  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
};

export default function Contact() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/public/settings");

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        setSettings(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSettings();
  }, []);

  return (
    <section
      id="kontakt"
      className="
      py-32
      bg-neutral-950
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        px-6
        text-center
        "
      >
        <motion.h2
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          text-5xl
          md:text-6xl
          font-black
          "
        >
          Kontakt
        </motion.h2>

        <p
          className="
          mt-8
          text-neutral-400
          text-xl
          "
        >
          Wir freuen uns auf deinen Besuch.
        </p>

        <div
          className="
          mt-12
          grid
          md:grid-cols-3
          gap-6
          "
        >
          <div
            className="
            bg-neutral-900
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3 className="font-bold text-xl">
              Telefon
            </h3>

            <div className="mt-3 text-neutral-400">
              {settings?.phone1 && (
                <div>{settings.phone1}</div>
              )}

              {settings?.phone2 && (
                <div>{settings.phone2}</div>
              )}

              {settings?.phone3 && (
                <div>{settings.phone3}</div>
              )}
            </div>
          </div>

          <div
            className="
            bg-neutral-900
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3 className="font-bold text-xl">
              E-Mail
            </h3>

            <p className="mt-3 text-neutral-400">
              {settings?.email || "Keine E-Mail"}
            </p>
          </div>

          <div
            className="
            bg-neutral-900
            rounded-3xl
            p-8
            border
            border-white/10
            "
          >
            <h3 className="font-bold text-xl">
              Adresse
            </h3>

            <div className="mt-3 text-neutral-400">
              {settings?.addressLine1 && (
                <div>{settings.addressLine1}</div>
              )}

              {settings?.addressLine2 && (
                <div>{settings.addressLine2}</div>
              )}

              {settings?.addressLine3 && (
                <div>{settings.addressLine3}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}