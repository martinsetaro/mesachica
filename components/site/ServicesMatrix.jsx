'use client';

import { Boxes, LayoutGrid, Workflow, BarChart3, Code2, Cloud } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import useReveal from './useReveal';

const SERVICES = [
  {
    icon: Boxes,
    title: 'Dynamics 365',
    subtitle: 'CRM y gestión empresarial adaptados a los procesos reales de cada organización.',
    desc: 'Implementamos y evolucionamos soluciones para centralizar la gestión comercial, la atención al cliente y los procesos relacionados.',
    result: 'Una gestión comercial y de atención al cliente centralizada, con procesos y permisos claros.',
    capabilities: [
      'Dynamics 365 Sales',
      'Dynamics 365 Customer Service',
      'Gestión de clientes y contactos',
      'Seguimiento de oportunidades',
      'Gestión de casos e incidencias',
      'Procesos empresariales',
      'Seguridad, permisos y roles',
      'Migración de datos',
      'Personalizaciones funcionales y técnicas',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Power Apps y Dataverse',
    subtitle: 'Aplicaciones empresariales personalizadas con datos centralizados y seguros.',
    desc: 'Creamos aplicaciones que reemplazan procesos manuales y herramientas dispersas, adaptándose a las necesidades de cada área.',
    result: 'Menos dependencia de planillas sueltas y más aplicaciones internas hechas a medida del proceso real.',
    capabilities: [
      'Aplicaciones model-driven',
      'Aplicaciones canvas',
      'Modelado de datos en Dataverse',
      'Formularios y vistas',
      'Reglas de negocio',
      'Seguridad y permisos',
      'Integración con Microsoft 365',
      'Modernización de procesos basados en Excel',
    ],
  },
  {
    icon: Workflow,
    title: 'Power Automate',
    subtitle: 'Automatización de tareas, aprobaciones y procesos empresariales.',
    desc: 'Diseñamos flujos que reducen trabajo manual, mejoran la trazabilidad y conectan las herramientas utilizadas por la organización.',
    result: 'Tareas repetitivas resueltas de forma automática y procesos con trazabilidad de principio a fin.',
    capabilities: [
      'Flujos automatizados',
      'Aprobaciones',
      'Notificaciones',
      'Procesamiento documental',
      'Integración con Dynamics 365',
      'Integración con SharePoint, Outlook y Teams',
      'Procesos programados',
      'Automatizaciones sobre Dataverse',
      'Gestión de errores y monitoreo',
    ],
  },
  {
    icon: BarChart3,
    title: 'Power BI',
    subtitle: 'Información clara para tomar mejores decisiones.',
    desc: 'Transformamos datos comerciales y operativos en dashboards comprensibles, actualizados y orientados a objetivos de negocio.',
    result: 'Decisiones apoyadas en datos actualizados, no en reportes armados a mano.',
    capabilities: [
      'Dashboards ejecutivos',
      'Indicadores comerciales',
      'Informes operativos',
      'Integración con Dynamics 365 y Dataverse',
      'Integración con múltiples fuentes',
      'Modelado de datos',
      'Transformación de información',
      'Distribución segura de reportes',
    ],
  },
  {
    icon: Code2,
    title: 'Desarrollo para Dynamics 365 y Dataverse',
    subtitle: 'Extensiones y componentes personalizados para cubrir necesidades avanzadas.',
    desc: 'Desarrollamos funcionalidades que amplían las capacidades estándar de Dynamics 365, Power Platform y Dataverse.',
    result: 'Funcionalidades a medida cuando lo estándar de la plataforma no alcanza para el proceso del negocio.',
    capabilities: [
      'Plugins de Dataverse',
      'Custom APIs',
      'JavaScript para formularios',
      'PCF Controls',
      'Componentes personalizados',
      'Procesos backend',
      'Validaciones avanzadas',
      'Integraciones con servicios externos',
      'Desarrollo en .NET',
    ],
  },
  {
    icon: Cloud,
    title: 'Azure e integraciones',
    subtitle: 'Conexión segura entre aplicaciones, datos y servicios empresariales.',
    desc: 'Creamos integraciones y servicios backend para conectar Dynamics 365 y Power Platform con sistemas internos y externos.',
    result: 'Sistemas internos, ERPs y plataformas externas conectados entre sí, sin procesos manuales de por medio.',
    capabilities: [
      'Azure Functions',
      'APIs REST',
      'Microservicios cuando sean necesarios',
      'Procesamiento asíncrono',
      'Azure Service Bus',
      'Webhooks',
      'Integración con ERPs',
      'Integración con sistemas heredados',
      'Monitoreo y registro de errores',
    ],
  },
];

export default function ServicesMatrix() {
  const ref = useReveal();

  return (
    <section ref={ref} id="servicios" className="bg-muted px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          eyebrow="Servicios"
          title="Cada servicio, pensado por el problema que resuelve."
          subtitle="Implementamos y evolucionamos soluciones sobre el ecosistema Microsoft, con foco en resultados empresariales concretos."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="reveal card-surface flex h-full flex-col rounded-xl p-7"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <s.icon className="h-7 w-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm font-medium text-accent">{s.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

              <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-md bg-muted p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Resultado esperado
                </span>
                <p className="mt-1 text-sm text-foreground/85">{s.result}</p>
              </div>

              <a
                href="#contacto"
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Consultar por este servicio →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
