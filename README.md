# Quanta Solution — Sitio web

Réplica del diseño original (base44) armada en **Next.js 14** (App Router) + Tailwind CSS.

## Correr en local

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abrí http://localhost:3000

## Formulario de contacto (Resend)

El formulario de "Auditoría Estratégica" envía un email real usando **Resend**, igual que hicimos en Floowixa.

1. Entrá a [resend.com](https://resend.com) e iniciá sesión
2. **API Keys** → **Create API Key** → copiá la key (empieza con `re_`)
3. Abrí `.env.local` (lo creás copiando `.env.local.example`) y completá:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
   EMAIL_TO=tu-correo@gmail.com
   ```
4. Reiniciá el servidor (`Ctrl+C` y `npm run dev` de nuevo)

**Importante sobre el remitente:** mientras no verifiques un dominio propio en Resend, el email
tiene que salir desde `onboarding@resend.dev` (así está configurado en `app/api/contact/route.js`).
Cuando tengas un dominio para Quanta Solution, lo agregás en Resend → Domains, y cambiás el `from`
por algo como `Quanta Solution <hola@tudominio.com>`.

## Deploy

Mismo flujo que la otra vez: subís el repo a GitHub y lo conectás en Vercel (o `vercel` desde la
terminal). No te olvides de cargar `RESEND_API_KEY` y `EMAIL_TO` como variables de entorno en
Vercel → Settings → Environment Variables (el `.env.local` no se sube al repo).

## Estructura

```
app/
  layout.js          # layout raíz + metadata
  page.js             # página principal (splash + secciones)
  globals.css         # estilos globales / paleta de colores
  api/contact/route.js # endpoint que envía el email con Resend
components/
  site/                # Navbar, Hero, ServicesMatrix, InsightLab,
                        # Methodology, ConversionBridge, Footer,
                        # SplashScreen, Logo, FlowCursor
  ui/
    image.jsx          # wrapper simple de <img>
    use-toast.js        # notificaciones (reemplaza al de shadcn/base44)
```

## Nota

`FlowCursor.jsx` (el cursor custom) no vino en los archivos originales que se compartieron,
así que se armó una versión propia con el mismo espíritu visual (punto + anillo que sigue el mouse).
Si tenés el original, decime y lo reemplazo.
