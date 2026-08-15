"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GalleryImage = {
  id: number;
  image: string;
  createdAt?: string;
};

type Service = {
  id: number;
  title: string;
  description: string;
};

const MAX_GALLERY_IMAGES = 30;

export default function SettingsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const [email, setEmail] = useState("");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");

  const [openingHours, setOpeningHours] = useState("");

  const [instagramUrl, setInstagramUrl] = useState("");

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [editingService, setEditingService] =
    useState<Service | null>(null);

  const [impressumText, setImpressumText] = useState("");
  const [datenschutzText, setDatenschutzText] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
    loadGallery();
    loadServices();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/settings");

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      setTitle(data.homeTitle || "");
      setSubtitle(data.homeSubtitle || "");
      setImage(data.homeImage || "");

      setPhone1(data.phone1 || "");
      setPhone2(data.phone2 || "");
      setPhone3(data.phone3 || "");

      setEmail(data.email || "");

      setAddressLine1(data.addressLine1 || "");
      setAddressLine2(data.addressLine2 || "");
      setAddressLine3(data.addressLine3 || "");

      setOpeningHours(data.openingHours || "");

      setInstagramUrl(data.instagramUrl || "");

      setImpressumText(data.impressumText || "");
      setDatenschutzText(data.datenschutzText || "");
    } catch (error) {
      console.error("SETTINGS LOAD ERROR:", error);
    }
  }

  async function loadGallery() {
    try {
      setGalleryLoading(true);

      const res = await fetch("/api/gallery");

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setGalleryImages(data);
      }
    } catch (error) {
      console.error("GALLERY LOAD ERROR:", error);
    } finally {
      setGalleryLoading(false);
    }
  }

  async function loadServices() {
    try {
      setServicesLoading(true);

      const res = await fetch("/api/services");

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
      setServicesLoading(false);
    }
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setMessage("Bild wird hochgeladen...");

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setMessage(
          data.error || "Upload fehlgeschlagen"
        );
        return;
      }

      setImage(data.url);

      setMessage("Startseitenbild hochgeladen ✓");

      e.target.value = "";
    } catch (error) {
      console.error("IMAGE UPLOAD ERROR:", error);

      setMessage("Bild-Upload fehlgeschlagen");
    }
  }

  async function uploadGalleryImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (galleryImages.length >= MAX_GALLERY_IMAGES) {
      setMessage(
        `Die Galerie kann maximal ${MAX_GALLERY_IMAGES} Bilder enthalten.`
      );

      e.target.value = "";

      return;
    }

    try {
      setGalleryUploading(true);

      setMessage("Galerie-Bild wird hochgeladen...");

      const formData = new FormData();

      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.url) {
        setMessage(
          uploadData.error || "Upload fehlgeschlagen"
        );

        return;
      }

      const galleryRes = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadData.url,
        }),
      });

      const galleryData = await galleryRes.json();

      if (!galleryRes.ok) {
        setMessage(
          galleryData.error ||
            "Galerie-Bild konnte nicht gespeichert werden"
        );

        return;
      }

      setMessage("Galerie-Bild hinzugefügt ✓");

      await loadGallery();

      e.target.value = "";
    } catch (error) {
      console.error("GALLERY UPLOAD ERROR:", error);

      setMessage("Galerie-Upload fehlgeschlagen");
    } finally {
      setGalleryUploading(false);
    }
  }

  async function deleteGalleryImage(id: number) {
    try {
      setMessage("Bild wird gelöscht...");

      const res = await fetch("/api/gallery", {
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
            "Bild konnte nicht gelöscht werden"
        );

        return;
      }

      setMessage("Galerie-Bild gelöscht ✓");

      await loadGallery();
    } catch (error) {
      console.error("GALLERY DELETE ERROR:", error);

      setMessage("Löschen fehlgeschlagen");
    }
  }

  function resetServiceForm() {
    setServiceTitle("");
    setServiceDescription("");
    setEditingService(null);
  }

  function startEditService(service: Service) {
    setEditingService(service);

    setServiceTitle(service.title || "");
    setServiceDescription(
      service.description || ""
    );

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  async function saveService() {
    if (!serviceTitle.trim()) {
      setMessage(
        "Bitte einen Titel für das Angebot eingeben."
      );
      return;
    }

    try {
      setMessage("Angebot wird gespeichert...");

      const payload = {
        title: serviceTitle.trim(),
        description: serviceDescription,
      };

      let res;

      if (editingService) {
        res = await fetch("/api/services", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            id: editingService.id,
          }),
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            "Angebot konnte nicht gespeichert werden"
        );

        return;
      }

      setMessage(
        editingService
          ? "Angebot gespeichert ✓"
          : "Angebot hinzugefügt ✓"
      );

      resetServiceForm();

      await loadServices();
    } catch (error) {
      console.error(
        "SERVICE SAVE ERROR:",
        error
      );

      setMessage(
        "Angebot konnte nicht gespeichert werden"
      );
    }
  }

  async function deleteService(id: number) {
    const confirmed = window.confirm(
      "Möchtest du dieses Angebot wirklich löschen?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("Angebot wird gelöscht...");

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
            "Angebot konnte nicht gelöscht werden"
        );

        return;
      }

      if (editingService?.id === id) {
        resetServiceForm();
      }

      setMessage("Angebot gelöscht ✓");

      await loadServices();
    } catch (error) {
      console.error(
        "SERVICE DELETE ERROR:",
        error
      );

      setMessage(
        "Angebot konnte nicht gelöscht werden"
      );
    }
  }

  async function save() {
    try {
      setMessage("Speichern...");

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeTitle: title,
          homeSubtitle: subtitle,
          homeImage: image,

          phone1,
          phone2,
          phone3,

          email,

          addressLine1,
          addressLine2,
          addressLine3,

          openingHours,

          instagramUrl,

          impressumText,
          datenschutzText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            "Fehler beim Speichern"
        );

        return;
      }

      setMessage("Alles gespeichert ✓");
    } catch (error) {
      console.error(
        "SETTINGS SAVE ERROR:",
        error
      );

      setMessage("Fehler beim Speichern");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

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
          Einstellungen
        </h1>

        <p className="text-slate-400 mt-2">
          Website verwalten
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {/* STARTSEITE */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Startseite
            </h2>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Titel"
              className="
                mt-6
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={subtitle}
              onChange={(e) =>
                setSubtitle(e.target.value)
              }
              placeholder="Untertitel"
              className="
                mt-4
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={uploadImage}
              className="mt-5 block"
            />

            {image && (
              <img
                src={image}
                alt="Startseitenbild"
                className="
                  mt-5
                  rounded-2xl
                  h-48
                  w-full
                  object-cover
                "
              />
            )}
          </section>

          {/* KONTAKT */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Kontakt
            </h2>

            <input
              value={phone1}
              onChange={(e) =>
                setPhone1(e.target.value)
              }
              placeholder="Telefon 1"
              className="
                mt-6
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={phone2}
              onChange={(e) =>
                setPhone2(e.target.value)
              }
              placeholder="Telefon 2"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={phone3}
              onChange={(e) =>
                setPhone3(e.target.value)
              }
              placeholder="Telefon 3"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="E-Mail"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={addressLine1}
              onChange={(e) =>
                setAddressLine1(e.target.value)
              }
              placeholder="Adresse Zeile 1"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={addressLine2}
              onChange={(e) =>
                setAddressLine2(e.target.value)
              }
              placeholder="Adresse Zeile 2"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />

            <input
              value={addressLine3}
              onChange={(e) =>
                setAddressLine3(e.target.value)
              }
              placeholder="Adresse Zeile 3"
              className="
                mt-4
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />
          </section>

          {/* ÖFFNUNGSZEITEN */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Öffnungszeiten
            </h2>

            <textarea
              value={openingHours}
              onChange={(e) =>
                setOpeningHours(e.target.value)
              }
              placeholder="Öffnungszeiten"
              className="
                mt-6
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
                h-32
                resize-none
              "
            />
          </section>

          {/* INSTAGRAM */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Instagram
            </h2>

            <p className="text-slate-400 mt-2">
              Hier den vollständigen Instagram-Link
              eintragen.
            </p>

            <input
              value={instagramUrl}
              onChange={(e) =>
                setInstagramUrl(e.target.value)
              }
              placeholder="https://instagram.com/..."
              className="
                mt-6
                w-full
                bg-slate-800
                rounded-xl
                px-5
                py-3
              "
            />
          </section>

          {/* TEAM */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Team
            </h2>

            <p className="text-slate-400 mt-3">
              Teammitglieder verwalten
            </p>

            <button
              onClick={() =>
                router.push("/admin/team")
              }
              className="
                mt-5
                bg-blue-600
                hover:bg-blue-700
                px-6
                py-3
                rounded-xl
                transition
              "
            >
              Team öffnen
            </button>
          </section>

          {/* RECHTLICHES */}

          <section className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold">
              Rechtliches
            </h2>

            <textarea
              value={impressumText}
              onChange={(e) =>
                setImpressumText(e.target.value)
              }
              placeholder="Impressum"
              className="
                mt-5
                w-full
                bg-slate-800
                rounded-xl
                p-4
                h-32
                resize-none
              "
            />

            <textarea
              value={datenschutzText}
              onChange={(e) =>
                setDatenschutzText(e.target.value)
              }
              placeholder="Datenschutz"
              className="
                mt-5
                w-full
                bg-slate-800
                rounded-xl
                p-4
                h-32
                resize-none
              "
            />
          </section>

          {/* ANGEBOTE */}

          <section className="
            md:col-span-2
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <div className="
              flex
              flex-col
              md:flex-row
              md:items-start
              md:justify-between
              gap-4
            ">

              <div>
                <h2 className="text-2xl font-bold">
                  Angebote
                </h2>

                <p className="text-slate-400 mt-2">
                  Angebote für die Website verwalten.
                </p>
              </div>

              {editingService && (
                <button
                  type="button"
                  onClick={resetServiceForm}
                  className="
                    bg-slate-700
                    hover:bg-slate-600
                    px-5
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  Bearbeitung abbrechen
                </button>
              )}

            </div>

            {/* FORMULAR */}

            <div className="
              mt-8
              bg-slate-800
              border
              border-slate-700
              rounded-2xl
              p-6
            ">

              <h3 className="text-xl font-bold">
                {editingService
                  ? "Angebot bearbeiten"
                  : "Neues Angebot"}
              </h3>

              <input
                value={serviceTitle}
                onChange={(e) =>
                  setServiceTitle(e.target.value)
                }
                placeholder="Titel des Angebots"
                className="
                  mt-5
                  w-full
                  bg-slate-900
                  border
                  border-slate-700
                  rounded-xl
                  px-5
                  py-3
                "
              />

              <textarea
                value={serviceDescription}
                onChange={(e) =>
                  setServiceDescription(
                    e.target.value
                  )
                }
                placeholder="Beschreibung"
                className="
                  mt-4
                  w-full
                  bg-slate-900
                  border
                  border-slate-700
                  rounded-xl
                  px-5
                  py-3
                  h-32
                  resize-none
                "
              />

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  type="button"
                  onClick={saveService}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    px-6
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  {editingService
                    ? "Angebot speichern"
                    : "Angebot hinzufügen"}
                </button>

                {editingService && (
                  <button
                    type="button"
                    onClick={resetServiceForm}
                    className="
                      bg-slate-700
                      hover:bg-slate-600
                      px-6
                      py-3
                      rounded-xl
                      font-bold
                      transition
                    "
                  >
                    Abbrechen
                  </button>
                )}

              </div>

            </div>

            {/* BESTEHENDE ANGEBOTE */}

            <div className="mt-8">

              <h3 className="text-xl font-bold">
                Vorhandene Angebote
              </h3>

              {servicesLoading ? (

                <p className="mt-5 text-slate-400">
                  Angebote werden geladen...
                </p>

              ) : services.length === 0 ? (

                <div className="
                  mt-5
                  border
                  border-dashed
                  border-slate-700
                  rounded-2xl
                  p-8
                  text-center
                  text-slate-500
                ">
                  Noch keine Angebote vorhanden.
                </div>

              ) : (

                <div className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-5
                  mt-5
                ">

                  {services.map((service) => (

                    <div
                      key={service.id}
                      className="
                        bg-slate-800
                        border
                        border-slate-700
                        rounded-2xl
                        p-5
                      "
                    >

                      <h4 className="text-lg font-bold">
                        {service.title}
                      </h4>

                      {service.description && (
                        <p className="
                          text-slate-400
                          mt-2
                          text-sm
                          whitespace-pre-line
                        ">
                          {service.description}
                        </p>
                      )}

                      <div className="
                        flex
                        gap-3
                        mt-5
                      ">

                        <button
                          type="button"
                          onClick={() =>
                            startEditService(
                              service
                            )
                          }
                          className="
                            flex-1
                            bg-blue-600
                            hover:bg-blue-700
                            py-2
                            rounded-xl
                            font-bold
                            transition
                          "
                        >
                          Bearbeiten
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteService(
                              service.id
                            )
                          }
                          className="
                            flex-1
                            bg-red-600
                            hover:bg-red-700
                            py-2
                            rounded-xl
                            font-bold
                            transition
                          "
                        >
                          Löschen
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </section>

          {/* GALERIE */}

          <section className="
            md:col-span-2
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <div className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            ">

              <div>

                <h2 className="text-2xl font-bold">
                  Galerie
                </h2>

                <p className="text-slate-400 mt-2">
                  Bis zu {MAX_GALLERY_IMAGES} Bilder
                  für die Galerie verwalten.
                </p>

                <p className="text-slate-500 mt-1">
                  Aktuell {galleryImages.length} von{" "}
                  {MAX_GALLERY_IMAGES} Bildern.
                </p>

              </div>

              <label
                className={`
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  rounded-xl
                  font-bold
                  transition
                  ${
                    galleryImages.length >=
                      MAX_GALLERY_IMAGES ||
                    galleryUploading
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }
                `}
              >
                {galleryUploading
                  ? "Wird hochgeladen..."
                  : "+ Bild hinzufügen"}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={uploadGalleryImage}
                  className="hidden"
                  disabled={
                    galleryImages.length >=
                      MAX_GALLERY_IMAGES ||
                    galleryUploading
                  }
                />
              </label>

            </div>

            {galleryImages.length >=
              MAX_GALLERY_IMAGES && (
              <p className="mt-4 text-yellow-400">
                Die Galerie enthält bereits{" "}
                {MAX_GALLERY_IMAGES} Bilder.
                Lösche zuerst ein Bild, bevor du
                ein neues hinzufügst.
              </p>
            )}

            {galleryLoading ? (

              <p className="mt-8 text-slate-400">
                Galerie wird geladen...
              </p>

            ) : galleryImages.length === 0 ? (

              <div className="
                mt-8
                border
                border-dashed
                border-slate-700
                rounded-2xl
                p-10
                text-center
                text-slate-500
              ">
                Noch keine Bilder vorhanden.
              </div>

            ) : (

              <div className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-5
                mt-8
              ">

                {galleryImages.map(
                  (galleryImage, index) => (

                    <div
                      key={galleryImage.id}
                      className="
                        bg-slate-800
                        rounded-2xl
                        overflow-hidden
                        border
                        border-slate-700
                      "
                    >

                      <div className="relative">

                        <img
                          src={galleryImage.image}
                          alt={`Galerie Bild ${
                            index + 1
                          }`}
                          className="
                            w-full
                            h-48
                            object-cover
                          "
                        />

                        <div className="
                          absolute
                          top-3
                          left-3
                          bg-black/70
                          backdrop-blur-sm
                          px-3
                          py-1
                          rounded-full
                          text-sm
                        ">
                          Bild {index + 1}
                        </div>

                      </div>

                      <div className="p-4">

                        <button
                          type="button"
                          onClick={() =>
                            deleteGalleryImage(
                              galleryImage.id
                            )
                          }
                          className="
                            w-full
                            bg-red-600
                            hover:bg-red-700
                            py-2
                            rounded-xl
                            font-bold
                            transition
                          "
                        >
                          Bild löschen
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        </div>

        {/* SPEICHERN */}

        <button
          type="button"
          onClick={save}
          className="
            mt-10
            bg-green-600
            hover:bg-green-700
            px-8
            py-4
            rounded-xl
            font-bold
            transition
          "
        >
          Alles speichern
        </button>

        {message && (
          <p className="mt-5 text-green-400">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}