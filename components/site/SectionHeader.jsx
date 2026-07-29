export function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <span className="section-eyebrow text-sm font-semibold uppercase text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl ${eyebrow ? 'mt-3' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
