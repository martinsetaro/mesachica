'use client';

import { SectionHeader } from './SectionHeader';
import useReveal from './useReveal';
import { Building2, Blocks, Cloud, Code2 } from 'lucide-react';

const GROUPS = [
  {
    category: 'CRM y gestión empresarial',
    icon: Building2,
    items: ['Microsoft Dynamics 365', 'Dynamics 365 Sales', 'Dynamics 365 Customer Service'],
  },
  {
    category: 'Power Platform',
    icon: Blocks,
    items: ['Microsoft Power Apps', 'Microsoft Power Automate', 'Microsoft Power BI', 'Microsoft Dataverse'],
  },
  {
    category: 'Nube e integración',
    icon: Cloud,
    items: ['Microsoft Azure', 'Azure Functions', 'Azure Service Bus', 'APIs REST'],
  },
  {
    category: 'Productividad y desarrollo',
    icon: Code2,
    items: ['Microsoft 365', 'SharePoint', 'Teams', '.NET', 'JavaScript'],
  },
];

export default function Technologies() {
  const ref = useReveal();

  return (
    <section ref={ref} id="tecnologias" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader eyebrow="Tecnologías" title="El stack técnico detrás de cada solución." />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={g.category}
                className="reveal flex flex-col rounded-2xl border border-border bg-card/50 p-6 shadow-sm transition-shadow hover:shadow-md"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {g.category}
                  </h3>
                </div>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm text-foreground/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}