'use client';

import { SectionHeader } from './SectionHeader';
import useReveal from './useReveal';

const PROFILES = [
  'Empresas que necesitan implementar Dynamics 365.',
  'Organizaciones que quieren mejorar una implementación existente.',
  'Empresas que gestionan procesos críticos mediante Excel y correo.',
  'Equipos que necesitan aplicaciones internas con Power Apps.',
  'Áreas que requieren automatizar tareas y aprobaciones.',
  'Empresas que necesitan integrar CRM, ERP y Microsoft 365.',
  'Organizaciones que buscan dashboards con Power BI.',
  'Partners tecnológicos que necesitan capacidad especializada.',
];

export default function TargetClients() {
  const ref = useReveal();

  return (
    <section ref={ref} className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          title="Soluciones para empresas que necesitan mejorar sus procesos."
          subtitle="Trabajamos con organizaciones que utilizan o quieren adoptar el ecosistema Microsoft para centralizar información, automatizar operaciones y conectar sus sistemas."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PROFILES.map((p, i) => (
            <li
              key={p}
              className="reveal flex items-start gap-3 rounded-lg border border-border bg-white p-4"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-foreground/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
