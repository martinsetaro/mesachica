'use client';

import { Layers, Timer, Route, Link2, ArrowUpRight, LineChart } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import useReveal from './useReveal';

const BENEFITS = [
  {
    icon: Layers,
    title: 'Información centralizada',
    desc: 'Unificamos clientes, procesos y operaciones para evitar datos duplicados y herramientas aisladas.',
  },
  {
    icon: Timer,
    title: 'Menos trabajo manual',
    desc: 'Automatizamos tareas repetitivas para reducir errores y liberar tiempo del equipo.',
  },
  {
    icon: Route,
    title: 'Procesos trazables',
    desc: 'Permitimos conocer el estado de cada operación, aprobación, oportunidad o incidencia.',
  },
  {
    icon: Link2,
    title: 'Integraciones confiables',
    desc: 'Conectamos aplicaciones y sistemas para que la información circule de forma segura.',
  },
  {
    icon: ArrowUpRight,
    title: 'Soluciones escalables',
    desc: 'Diseñamos aplicaciones y arquitecturas preparadas para evolucionar junto con la empresa.',
  },
  {
    icon: LineChart,
    title: 'Mejor toma de decisiones',
    desc: 'Convertimos los datos existentes en información clara para responsables y directivos.',
  },
];

export default function Benefits() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-muted px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader title="Tecnología orientada a resultados concretos." align="center" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="reveal card-surface rounded-lg p-6"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <b.icon className="h-6 w-6 text-accent" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
