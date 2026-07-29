import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

// TODO: reemplazar por las URLs reales de los perfiles
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white px-6 py-12 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="Ir al inicio">
              <Image
                src="/logo-full.png"
                alt="Mesa Chica Solutions"
                width={358}
                height={101}
                className="h-9 w-auto md:h-11"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Implementación y desarrollo de soluciones empresariales con
              Dynamics 365, Power Platform, Dataverse y Azure.
            </p>
          </div>

          <FooterCol
            title="Servicios"
            links={[
              "Dynamics 365",
              "Power Apps",
              "Power Automate",
              "Power BI",
              "Azure e integraciones",
            ]}
          />

          <div>
            <FooterCol
              title="Contacto"
              links={["Solicitar una consulta"]}
              hrefs={["#contacto"]}
            />

            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mesa Chica Solutions. Todos los derechos
            reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Dynamics 365 · Power Platform · Azure
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, hrefs }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-secondary">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l, i) => (
          <li key={l}>
            {hrefs?.[i] ? (
              <a
                href={hrefs[i]}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {l}
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">{l}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
