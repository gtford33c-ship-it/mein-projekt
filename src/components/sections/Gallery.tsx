"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type GalleryImage = {
  id: number;
  image: string;
  createdAt?: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const res = await fetch("/api/gallery");

      if (!res.ok) return;

      const data = await res.json();

      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function nextImage() {
    if (images.length === 0) return;

    setCurrent((prev) => (prev + 1) % images.length);
  }

  function previousImage() {
    if (images.length === 0) return;

    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  return (
    <section
      id="galerie"
      className="py-32 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

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
          }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center">
            Galerie
          </h2>

          {loading ? (
            <div
              className="
                mt-16
                h-[600px]
                rounded-3xl
                bg-neutral-900
                border
                border-white/10
              "
            />
          ) : images.length === 0 ? (
            <div
              className="
                mt-16
                h-[400px]
                rounded-3xl
                border
                border-white/10
                bg-neutral-900
                flex
                items-center
                justify-center
                text-neutral-500
              "
            >
              Noch keine Bilder vorhanden.
            </div>
          ) : (
            <div className="mt-16 relative">

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-neutral-900
                "
              >
                <img
                  src={images[current].image}
                  alt={`Galerie Bild ${current + 1}`}
                  className="
                    w-full
                    h-[600px]
                    object-cover
                    block
                  "
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        bg-black/70
                        hover:bg-black
                        px-4
                        py-3
                        rounded-full
                        text-2xl
                        transition
                      "
                    >
                      ←
                    </button>

                    <button
                      onClick={nextImage}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        bg-black/70
                        hover:bg-black
                        px-4
                        py-3
                        rounded-full
                        text-2xl
                        transition
                      "
                    >
                      →
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-5
                      left-1/2
                      -translate-x-1/2
                      bg-black/70
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    "
                  >
                    {current + 1} / {images.length}
                  </div>
                )}
              </div>

            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}