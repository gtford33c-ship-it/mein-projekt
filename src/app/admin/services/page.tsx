"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Service = {
  id: number;
  title: string;
  description: string;
};

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState<Service | null>(null);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  async function loadServices() {
    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        cache: "no-store",
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error("SERVICES LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function createService(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Bitte einen Titel eingeben.");
      return;
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            "Angebot konnte nicht erstellt werden."
        );
        return;
      }

      setTitle("");
      setDescription("");

      setMessage("Angebot erstellt ✓");

      await loadServices();
    } catch (error) {
      console.error(
        "CREATE SERVICE ERROR:",
        error
      );

      setMessage(
        "Angebot konnte nicht erstellt werden."
      );
    }
  }

  async function deleteService(id: number) {
    try {
      const res = await fetch("/api/services", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            "Angebot konnte nicht gelöscht werden."
        );
        return;
      }

      setMessage("Angebot gelöscht ✓");

      await loadServices();
    } catch (error) {
      console.error(
        "DELETE SERVICE ERROR:",
        error
      );

      setMessage(
        "Angebot konnte nicht gelöscht werden."
      );
    }
  }

  async function updateService(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!edit) {
      return;
    }

    if (!edit.title.trim()) {
      setMessage("Bitte einen Titel eingeben.");
      return;
    }

    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: edit.id,
          title: edit.title.trim(),
          description: edit.description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            "Angebot konnte nicht gespeichert werden."
        );
        return;
      }

      setEdit(null);

      setMessage("Angebot gespeichert ✓");

      await loadServices();
    } catch (error) {
      console.error(
        "UPDATE SERVICE ERROR:",
        error
      );

      setMessage(
        "Angebot konnte nicht gespeichert werden."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <button
          onClick={() => router.push("/admin")}
          className="
            bg-slate-800
            hover:bg-slate-700
            px-5
            py-3
            rounded-xl
            transition
          "
        >
          ← Zurück zum Dashboard
        </button>

        <h1 className="text-4xl md:text-5xl font-black mt-8">
          Angebote
        </h1>

        <p className="text-slate-400 mt-2">
          Angebote der Webseite verwalten
        </p>


        {/* NEUES ANGEBOT */}

        <section className="
          mt-10
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
        ">

          <h2 className="text-2xl font-bold">
            Neues Angebot
          </h2>

          <form
            onSubmit={createService}
            className="mt-6 space-y-5"
          >

            {/* TITEL */}

            <div>

              <label className="text-slate-300">
                Titel
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="z. B. Treffpunkt"
                className="
                  mt-2
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-xl
                  px-5
                  py-3
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>


            {/* BESCHREIBUNG */}

            <div>

              <label className="text-slate-300">
                Beschreibung
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Beschreibung des Angebots"
                className="
                  mt-2
                  w-full
                  h-32
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-xl
                  px-5
                  py-3
                  outline-none
                  focus:border-blue-500
                  resize-none
                "
              />

            </div>


            {/* ERSTELLEN */}

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                px-6
                py-3
                rounded-xl
                font-bold
                transition
              "
            >
              Angebot erstellen
            </button>

          </form>

        </section>


        {/* STATUS */}

        {message && (
          <p className="mt-6 text-green-400 font-medium">
            {message}
          </p>
        )}


        {/* VORHANDENE ANGEBOTE */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Vorhandene Angebote
          </h2>


          {loading ? (

            <p className="text-slate-400 mt-6">
              Angebote werden geladen...
            </p>

          ) : services.length === 0 ? (

            <div className="
              mt-6
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-8
              text-slate-400
            ">
              Noch keine Angebote vorhanden.
            </div>

          ) : (

            <div className="
              grid
              md:grid-cols-2
              gap-6
              mt-6
            ">

              {services.map((service) => (

                <motion.div
                  key={service.id}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                  "
                >

                  <h3 className="text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className="
                    text-slate-400
                    mt-3
                    leading-relaxed
                    whitespace-pre-line
                  ">
                    {service.description}
                  </p>


                  {/* BUTTONS */}

                  <div className="
                    flex
                    gap-3
                    mt-6
                  ">

                    <button
                      type="button"
                      onClick={() =>
                        setEdit({
                          id: service.id,
                          title: service.title,
                          description:
                            service.description,
                        })
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Bearbeiten
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        deleteService(service.id)
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        px-5
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Löschen
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </section>


        {/* BEARBEITEN */}

        {edit && (

          <div className="
            fixed
            inset-0
            z-50
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-6
          ">

            <div className="
              w-full
              max-w-2xl
              bg-slate-900
              border
              border-slate-700
              rounded-3xl
              p-8
            ">

              {/* MODAL HEADER */}

              <div className="
                flex
                items-center
                justify-between
                gap-4
              ">

                <h2 className="text-2xl font-bold">
                  Angebot bearbeiten
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setEdit(null)
                  }
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-slate-800
                    hover:bg-slate-700
                    text-xl
                    transition
                  "
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={updateService}
                className="mt-6 space-y-5"
              >

                {/* TITEL */}

                <div>

                  <label className="text-slate-300">
                    Titel
                  </label>

                  <input
                    value={edit.title}
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        title: e.target.value,
                      })
                    }
                    className="
                      mt-2
                      w-full
                      bg-slate-800
                      border
                      border-slate-700
                      rounded-xl
                      px-5
                      py-3
                      outline-none
                      focus:border-blue-500
                    "
                  />

                </div>


                {/* BESCHREIBUNG */}

                <div>

                  <label className="text-slate-300">
                    Beschreibung
                  </label>

                  <textarea
                    value={edit.description}
                    onChange={(e) =>
                      setEdit({
                        ...edit,
                        description:
                          e.target.value,
                      })
                    }
                    className="
                      mt-2
                      w-full
                      h-32
                      bg-slate-800
                      border
                      border-slate-700
                      rounded-xl
                      px-5
                      py-3
                      resize-none
                    "
                  />

                </div>


                {/* BUTTONS */}

                <div className="
                  flex
                  gap-3
                  pt-3
                ">

                  <button
                    type="submit"
                    className="
                      flex-1
                      bg-green-600
                      hover:bg-green-700
                      py-3
                      rounded-xl
                      font-bold
                      transition
                    "
                  >
                    Speichern
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setEdit(null)
                    }
                    className="
                      px-6
                      bg-slate-800
                      hover:bg-slate-700
                      rounded-xl
                      transition
                    "
                  >
                    Abbrechen
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}