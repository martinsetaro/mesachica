'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SectionHeader } from './SectionHeader';
import CalendlyWidget from './CalendlyWidget';

const SERVICE_OPTIONS = [
  'Dynamics 365',
  'Power Apps',
  'Power Automate',
  'Power BI',
  'Azure e integraciones',
  'Desarrollo de plugins o componentes',
  'Soporte o evolución de una solución existente',
  'Otro',
];

const EMPTY_FORM = {
  fullName: '',
  email: '',
  company: '',
  role: '',
  country: '',
  service: '',
  needDescription: '',
  phone: '',
  website: '', // honeypot: campo oculto para bots, debe llegar vacío
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConversionBridge() {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'schedule'
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Ingresá tu nombre y apellido.';
    if (!form.email.trim()) next.email = 'Ingresá tu correo corporativo.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Ingresá un correo válido.';
    if (!form.company.trim()) next.company = 'Ingresá el nombre de la empresa.';
    if (!form.role.trim()) next.role = 'Ingresá tu cargo o posición.';
    if (!form.country.trim()) next.country = 'Ingresá tu país.';
    if (!form.service) next.service = 'Seleccioná un servicio de interés.';
    if (!form.needDescription.trim()) next.needDescription = 'Contanos brevemente tu necesidad.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.website) {
      // Honeypot completado: probablemente un bot. Simulamos éxito sin enviar nada.
      setDone(true);
      return;
    }

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setDone(true);
      toast({ title: 'Consulta enviada', description: 'Revisaremos la información y nos pondremos en contacto contigo.' });
    } catch (err) {
      toast({
        title: 'No se pudo enviar',
        description: 'Ocurrió un error al enviar el formulario. Tus datos no se perdieron, intentá nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="bg-muted px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Contacto"
              title="Solicitá una consulta"
              subtitle="Contanos qué proceso necesitas mejorar, automatizar o integrar. Respondemos en 24 horas hábiles."
            />
          </div>

          <div className="card-surface rounded-xl p-6 md:p-9">
            {!done && (
              <div className="mb-8 flex gap-6 border-b border-border" role="tablist" aria-label="Formas de contacto">
                <button
                  role="tab"
                  aria-selected={activeTab === 'message'}
                  onClick={() => setActiveTab('message')}
                  className={`px-1 pb-3 text-sm font-semibold transition-colors ${
                    activeTab === 'message'
                      ? 'border-b-2 border-primary text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Enviar mensaje
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'schedule'}
                  onClick={() => setActiveTab('schedule')}
                  className={`px-1 pb-3 text-sm font-semibold transition-colors ${
                    activeTab === 'schedule'
                      ? 'border-b-2 border-primary text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Agendar reunión
                </button>
              </div>
            )}

            {done ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl text-accent" aria-hidden="true">✓</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">Consulta recibida</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Recibimos tu consulta correctamente. Revisaremos la información y nos pondremos
                  en contacto contigo.
                </p>
              </div>
            ) : activeTab === 'schedule' ? (
              <CalendlyWidget />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="fullName"
                    label="Nombre y apellido"
                    value={form.fullName}
                    onChange={(v) => setField('fullName', v)}
                    error={errors.fullName}
                    required
                  />
                  <Field
                    id="email"
                    label="Correo corporativo"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField('email', v)}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="company"
                    label="Empresa"
                    value={form.company}
                    onChange={(v) => setField('company', v)}
                    error={errors.company}
                    required
                  />
                  <Field
                    id="role"
                    label="Cargo o posición"
                    value={form.role}
                    onChange={(v) => setField('role', v)}
                    error={errors.role}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="country"
                    label="País"
                    value={form.country}
                    onChange={(v) => setField('country', v)}
                    error={errors.country}
                    required
                  />
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground">
                      Servicio de interés <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setField('service', e.target.value)}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">Seleccioná una opción</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className="mt-1.5 text-sm text-destructive">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="needDescription" className="block text-sm font-medium text-foreground">
                    Descripción de la necesidad <span aria-hidden="true">*</span>
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe brevemente el proceso, problema o solución que necesitas implementar.
                  </p>
                  <textarea
                    id="needDescription"
                    value={form.needDescription}
                    onChange={(e) => setField('needDescription', e.target.value)}
                    rows={4}
                    aria-invalid={!!errors.needDescription}
                    aria-describedby={errors.needDescription ? 'needDescription-error' : undefined}
                    className="mt-2 w-full resize-none rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  {errors.needDescription && (
                    <p id="needDescription-error" className="mt-1.5 text-sm text-destructive">
                      {errors.needDescription}
                    </p>
                  )}
                </div>

                <Field
                  id="phone"
                  label="Teléfono o WhatsApp (opcional)"
                  value={form.phone}
                  onChange={(v) => setField('phone', v)}
                />

                {/* Honeypot anti-spam: oculto para personas, visible para bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                >
                  <label htmlFor="website">No completar este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setField('website', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors btn-sweep disabled:opacity-60"
                >
                  {submitting ? 'Enviando…' : 'Solicitar una consulta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, value, onChange, required, type = 'text', error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-1.5 w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
