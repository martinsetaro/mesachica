'use client';

import { useEffect, useRef } from 'react';
import { ClipboardList, Database, Cable, BarChart2, TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import useReveal from './useReveal';

const BLOCKS = [
  {
    icon: ClipboardList,
    title: 'Procesos manuales',
    desc: 'Sustituimos tareas repetitivas, correos y hojas de cálculo por flujos automatizados y aplicaciones empresariales.',
  },
  {
    icon: Database,
    title: 'Información dispersa',
    desc: 'Centralizamos datos comerciales, operativos y de atención al cliente en plataformas seguras y accesibles.',
  },
  {
    icon: Cable,
    title: 'Sistemas desconectados',
    desc: 'Integramos Dynamics 365, Dataverse, Microsoft 365, APIs, ERPs y otros sistemas empresariales.',
  },
  {
    icon: BarChart2,
    title: 'Falta de visibilidad',
    desc: 'Creamos dashboards e indicadores que facilitan el seguimiento y la toma de decisiones.',
  },
  {
    icon: TrendingUp,
    title: 'Soluciones que no escalan',
    desc: 'Diseñamos arquitecturas preparadas para crecer, mantener el rendimiento y simplificar futuras evoluciones.',
  },
];

export default function Problems() {
  const ref = useReveal();

  return (
    <section ref={ref} id="soluciones" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          title="Convertimos procesos fragmentados en soluciones conectadas."
          subtitle="Ayudamos a empresas que necesitan centralizar información, automatizar tareas, mejorar la gestión de clientes e integrar sus sistemas actuales."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {BLOCKS.map((b, i) => (
            <div
              key={b.title}
              className="reveal card-surface rounded-lg p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <b.icon className="h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
