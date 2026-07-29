export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-secondary pt-32 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
            Dynamics 365 · Power Platform · Azure
          </span>

          <h1 className="mt-6 text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
            Soluciones Microsoft para conectar ventas, servicio y operaciones.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Diseñamos, implementamos y evolucionamos soluciones empresariales con Dynamics 365,
            Power Platform, Power BI y Azure.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            Centralizamos procesos, automatizamos tareas e integramos sistemas para mejorar la
            gestión comercial, operativa y de atención al cliente.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Solicitar una consulta
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conocer nuestros servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
