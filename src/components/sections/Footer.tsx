"use client";

import { useEffect, useState } from "react";

type Settings = {
  instagramUrl: string;
  impressumText: string;
  datenschutzText: string;
};

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    instagramUrl: "",
    impressumText: "",
    datenschutzText: "",
  });

  const [legalOpen, setLegalOpen] = useState<
    "impressum" | "datenschutz" | null
  >(null);

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
          impressumText: data.impressumText || "",
          datenschutzText: data.datenschutzText || "",
        });
      } catch (error) {
        console.error("FOOTER SETTINGS ERROR:", error);
      }
    }

    loadSettings();
  }, []);

  return (
    <footer className="bg-black text-neutral-500 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* COPYRIGHT */}

          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Jugendtreff Trini
          </p>


          {/* LINKS */}

          <div className="flex flex-wrap items-center justify-center gap-6">

            <button
              onClick={() => setLegalOpen("impressum")}
              className="text-sm hover:text-white transition"
            >
              Impressum
            </button>

            <button
              onClick={() => setLegalOpen("datenschutz")}
              className="text-sm hover:text-white transition"
            >
              Datenschutz
            </button>


            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
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

          </div>

        </div>

      </div>


      {/* RECHTLICHER DIALOG */}

      {legalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-6
          "
          onClick={() => setLegalOpen(null)}
        >

          <div
            className="
              w-full
              max-w-3xl
              max-h-[80vh]
              overflow-y-auto
              bg-neutral-950
              border
              border-white/10
              rounded-3xl
              p-8
              md:p-10
              text-white
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-center justify-between gap-6">

              <h2 className="text-3xl md:text-4xl font-black">
                {legalOpen === "impressum"
                  ? "Impressum"
                  : "Datenschutz"}
              </h2>

              <button
                onClick={() => setLegalOpen(null)}
                aria-label="Fenster schließen"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  text-xl
                  transition
                "
              >
                ×
              </button>

            </div>


            <div className="mt-8 text-neutral-300 leading-relaxed whitespace-pre-wrap">

              {legalOpen === "impressum"
                ? settings.impressumText || "Noch kein Impressum hinterlegt."
                : settings.datenschutzText ||
                  "Noch keine Datenschutzerklärung hinterlegt."}

            </div>

          </div>

        </div>
      )}

    </footer>
  );
}