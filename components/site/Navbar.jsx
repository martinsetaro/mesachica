"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "Inicio", href: "#top" },
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="Ir al inicio">
          <Image
            src="/logo-full.png"
            alt="Mesa Chica Solutions"
            width={358}
            height={101}
            priority
            className="h-9 w-auto md:h-11"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-secondary/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors btn-sweep md:inline-flex"
        >
          Solicitar una consulta
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={`h-0.5 w-6 rounded bg-secondary transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-secondary transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-secondary transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-secondary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Solicitar una consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
