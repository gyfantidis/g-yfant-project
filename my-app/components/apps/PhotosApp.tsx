"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  label: string;
  location?: string;
  description?: string;
}

const PHOTOS: Photo[] = [
  { src: "/photos/hikking_in_olympus.jpeg",          label: "Mount Olympus Hike",      location: "Mount Olympus, Greece",      description: "A step into myth and mountain air, where every trail feels like it’s leading a little closer to the gods." },
  { src: "/photos/selfi_at_folegandros.jpeg",        label: "Folegandros",         location: "Folegandros · GR",  description: "A sun-soaked moment on a quiet island, where even a simple selfie carries the calm rhythm of the Aegean." },
  { src: "/photos/acropolis_athens_greece.jpeg",     label: "Acropolis",           location: "Athens · GR",       description: "Standing where history was written in stone, a moment that connects the present with the timeless spirit of ancient Athens." },
  { src: "/photos/Amsterdam.jpeg",                   label: "Amsterdam",           location: "Amsterdam · NL",    description: "Caught between canals and quiet streets, a moment where the city moves slowly and every corner feels like a postcard." },
  { src: "/photos/thessaloniki.jpeg",                label: "Thessaloniki",        location: "Thessaloniki · GR", description: "A quiet tribute shaped like a tree, where each branch holds a memory—standing still in the city, yet carrying the weight of lives that should still be here." },
  { src: "/photos/profile-ngi.jpg",                  label: "NGI Forum",           location: "Brussels · EU",     description: "Representing at the NGI Forum — Next Generation Internet EU initiative." },
  { src: "/photos/graduated_at_patra.jpeg",          label: "Graduation",          location: "Hellenic Open University, Patras, Greece",       description: "A milestone earned through persistence and late nights—holding not just a degree, but the proof that dedication quietly builds something powerful." },
  { src: "/photos/IMG_6375.jpeg",                    label: "Paris Café Moment",   location: "Paris, France",     description: "A casual coffee break in the heart of Paris, where conversations blend with the aroma of espresso and time feels like it slows down just enough to be enjoyed." },
  { src: "/photos/parish_france.jpeg",               label: "Paris",               location: "Paris · FR",        description: "Under the glow of the Eiffel Tower, the night feels a little more alive—like the city is quietly reminding you why it’s called magical." },
  { src: "/photos/working_remote_kilkis.jpeg",       label: "Remote Work",         location: "Kilkis · GR",       description: "From a quiet corner of Kilkis, lines of code turn into ideas—proof that you don’t need a big city to build something meaningful." },
  { src: "/photos/IMG_5777.jpeg",                    label: "Brugge",              location: "Brugge · BE",       description: "An open-air gallery where past and present quietly meet—each frame holding a story that lingers just a little longer than a passing glance." },
  { src: "/photos/ngi.jpeg",                         label: "NGI",                 location: "Brussels · EU",     description: "Where ideas about the future of the internet take shape—conversations, debates, and visions all colliding in one room to quietly shape what comes next." },
  { src: "/photos/doiran_lake_Greece.jpeg",          label: "Lake Doiran",         location: "Lake Doiran, Kilkis, Greece",       description: "A quiet walk by the water where the horizon stretches endlessly—one of those places where everything slows down and your thoughts finally catch up with you." },
  { src: "/photos/Olympus.jpeg",                     label: "Mount Olympus",       location: "Petrostrouga Refuge, Mount Olympus, Greece",      description: "A well-earned pause high on Olympus, where a simple coffee tastes richer and every breath carries a bit of the mountain’s quiet power." },
  { src: "/photos/honey_yfantidis_kilkis.jpeg",      label: "Honey",               location: "Plagiochori, Kilkis, Greece",       description: "Golden drops of nature’s work, gathered with patience and care—honey that carries the quiet story of flowers, bees, and time." },
  { src: "/photos/IMG_5684.jpeg",                    label: "NGI Brussels Moment",                    location: "Brussels, Belgium",                  description: "Between sessions and ideas, a quiet moment in Brussels—where even the pauses carry the energy of innovation and new connections." },
  { src: "/photos/sunset_at_folegandros.jpeg",       label: "Folegandros Sunset",  location: "Folegandros · GR",  description: "As the sun slips behind the island, everything softens—the light, the pace, even the moment—leaving you somewhere between reflection and quiet awe." },
  { src: "/photos/IMG_7641.jpeg",                    label: "Kalamata",            location: "Kalamata · GR",     description: "A calm stroll by the sea, where the rhythm of the waves and the open horizon make even an ordinary moment feel quietly complete." },
  { src: "/photos/nicosia_split_border.jpeg",        label: "Nicosia Border",      location: "Nicosia · CY",      description: "A city split in silence, where a single street can carry two worlds—close enough to see, yet shaped by a history that still lingers in the air." },
  { src: "/photos/relaxing_in_chalkidiki.jpeg",      label: "Chalkidiki",          location: "Chalkidiki · GR",   description: "A slow moment by the sea, where the sun, the sand, and the sound of waves quietly remind you that doing nothing can feel like everything." },
  { src: "/photos/IMG_6318.jpeg",                    label: "Elevator Mirror Shot",                    location: "Indoors",                  description: "A quick pause between floors, where even an ordinary ride becomes a small moment to capture the in-between." },
  { src: "/photos/coffee_at_airport.jpeg",           label: "Airport Coffee",      location: "Airport",           description: "A quiet sip between departures, where time pauses just long enough to gather your thoughts before the next journey begins." },
  { src: "/photos/working_hour_at_kilkis.jpeg",      label: "Working",             location: "Kilkis · GR",       description: "Locked in and fully present, the kind of moment where ideas sharpen and progress happens one focused thought at a time." },
  { src: "/photos/coding-setup.jpg",                 label: "Setup",               location: "Home office",       description: "Lines of code, a screen full of logic, and that steady rhythm of building—where small fixes turn into real progress." },
  { src: "/photos/toumba_stadium_thessaloniki.jpeg", label: "Toumba Stadium",      location: "Toumba Stadium, Thessaloniki, Greece", description: "Where passion fills the air and every chant echoes louder—more than a match, it’s the heartbeat of PAOK." },
  { src: "/photos/food_in_kilkis.jpeg",              label: "Food",                location: "Kilkis · GR",       description: "Good food, good company, and that satisfying moment when the table turns into the highlight of the day." },
  { src: "/photos/limassol_cyprus.jpeg",             label: "Limassol",            location: "Limassol, Cyprus",     description: "A break among trees and sunlight, where a simple walk feels like hitting reset in the middle of the day." },
  { src: "/photos/ouzo_at_greek_island.jpeg",        label: "Ouzo",                location: "Greek Island",      description: "A glass of ouzo in the sun, where time stretches out and the sea does most of the talking." },
  { src: "/photos/greek_salad_at_folegandros.jpeg",  label: "Greek Salad",         location: "Folegandros · GR",  description: "Fresh, simple, and full of flavor—the kind of meal that tastes even better with a sea view and no rush at all." },
  { src: "/photos/training_Kilkis.jpeg",             label: "Training",            location: "Kilkis · GR",       description: "Pushing through another session, where effort meets discipline and every step builds something stronger than yesterday." },
  { src: "/photos/working_hours.jpeg",               label: "Working",             location: "Kilkis · GR",                  description: "Putting in the work, where consistency turns effort into progress and every session counts toward something bigger." },
  { src: "/photos/driving_in_thessaloniki_trafic.jpeg", label: "Thessaloniki",     location: "Thessaloniki · GR", description: "Caught in the city’s rhythm, where patience becomes part of the drive and every light feels like a small pause in the rush." },
  { src: "/photos/limasol-cyprus.jpeg",              label: "Limassol",            location: "Limassol · CY",     description: "A blend of city life and personal moments, where everyday surroundings turn into something more vivid and expressive through your own lens." },
  { src: "/photos/skra_waterfalls.jpeg",             label: "Skra Waterfalls",     location: "Skra · Kilkis · GR",         description: "Hidden among green and flowing water, a place where nature feels untouched and every step pulls you deeper into its calm." },
  { src: "/photos/double_giannis_in_Larissa.jpeg",   label: "Larissa",             location: "Larissa · GR",      description: "Mirrors catching more than just an image—one moment, seen from two angles, like a pause that echoes back at you." },
];

export default function PhotosApp() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);

  const next = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % PHOTOS.length)), []);

  // Intercept ESC before Window.tsx sees it
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setLightbox(null);
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [lightbox, prev, next]);

  const photo = lightbox !== null ? PHOTOS[lightbox] : null;

  return (
    <div
      style={{
        padding: 16,
        height: "100%",
        overflow: "auto",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* ── Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {PHOTOS.map((p, i) => (
          <div
            key={p.src}
            onClick={() => setLightbox(i)}
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--os-border)",
              cursor: "pointer",
              transition: "border-color 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--os-accent)";
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--os-border)";
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <Image
              src={p.src}
              alt={p.label || "Photo"}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 200px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {(p.label || p.location) && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "18px 8px 6px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {p.location || p.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {photo !== null && lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 22,
              width: 42,
              height: 42,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            ‹
          </button>

          {/* Image + info panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              maxWidth: "80vw",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.label || "Photo"}
              style={{
                maxWidth: "100%",
                maxHeight: "65vh",
                objectFit: "contain",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            {/* Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textAlign: "center",
              }}
            >
              {photo.location && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: "var(--os-accent)",
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    padding: "2px 10px",
                    borderRadius: 20,
                  }}
                >
                  📍 {photo.location}
                </div>
              )}
              {photo.description && (
                <p
                  style={{
                    fontFamily: "var(--font-dmsans), sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: 420,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {photo.description}
                </p>
              )}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 2,
                }}
              >
                {lightbox + 1} / {PHOTOS.length} · ← → to navigate · esc to close
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 22,
              width: 42,
              height: 42,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
