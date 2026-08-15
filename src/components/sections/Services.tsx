"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Service = {
  id: number;
  title: string;
  description: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      try {
        const res = await fetch("/api/services", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error(
            "SERVICES API ERROR:",
            res.status
          );
          return;
        }

        const data = await res.json();

        if (mounted && Array.isArray(data)) {
          setServices(data);
        }
      } catch (error) {
        console.error(
          "PUBLIC SERVICES ERROR:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="angebote"
      className="py-32 bg-neutral-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* TITEL */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center">
            Angebote
          </h2>
        </motion.div>


        {/* LADEN */}

        {loading && (
          <div className="mt-16 text-center text-neutral-500">
            Angebote werden geladen...
          </div>
        )}


        {/* KEINE ANGEBOTE */}

        {!loading && services.length === 0 && (
          <div className="mt-16 text-center text-neutral-500">
            Aktuell sind keine Angebote verfügbar.
          </div>
        )}


        {/* ANGEBOTE */}

        {!loading && services.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {services.map((service, index) => (
              <motion.div
                key={service.id}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className="
                  bg-neutral-900
                  border
                  border-white/10
                  rounded-3xl
                  text-center
                  p-8
                "
              >

                <h3 className="text-3xl font-bold">
                  {service.title}
                </h3>

                <p
                  className="
                    mt-5
                    text-neutral-400
                    leading-relaxed
                    whitespace-pre-line
                  "
                >
                  {service.description}
                </p>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}