"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Settings = {
  instagramUrl: string;
};

export default function Header() {
  const [settings, setSettings] = useState<Settings>({
    instagramUrl: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/public/settings");

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        setSettings({
          instagramUrl: data.instagramUrl || "",
        });
      } catch (error) {
        console.error("HEADER SETTINGS ERROR:", error);
      }
    }

    loadSettings();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}

        <motion.a
          href="#home"
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-2xl font-black tracking-widest text-white"
        >
          TRINI
        </motion.a>


        {/* NAVIGATION */}

        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">

          <a
            href="#home"
            className="hover:text-white transition"
          >
            Start
          </a>

          <a
            href="#angebote"
            className="hover:text-white transition"
          >
            Angebote
          </a>

          <a
            href="#team"
            className="hover:text-white transition"
          >
            Team
          </a>

          <a
            href="#zeiten"
            className="hover:text-white transition"
          >
            Öffnungszeiten
          </a>

          <a
            href="#galerie"
            className="hover:text-white transition"
          >
            Galerie
          </a>

          <a
            href="#kontakt"
            className="hover:text-white transition"
          >
            Kontakt
          </a>


          {/* INSTAGRAM */}

          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                ml-2
                w-10
                h-10
                rounded-full
                border
                border-white/10
                bg-white/5
                flex
                items-center
                justify-center
                text-white
                hover:bg-white
                hover:text-black
                hover:scale-110
                transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-5 h-5"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
          )}

        </nav>

      </div>
    </header>
  );
}