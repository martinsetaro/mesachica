export function Image({ src, alt, fittingType = 'fill', className = '', ...props }) {
  const objectFit = fittingType === 'fill' ? 'cover' : fittingType;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit }}
      loading="lazy"
      {...props}
    />
  );
}
