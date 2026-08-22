interface SectionProps {
  /** Zero-padded index shown before the label, e.g. "01". */
  num?: string;
  label?: string;
  id?: string;
  children: React.ReactNode;
}

/** A page section with the monospace "01 / selected work" eyebrow. */
export default function Section({ num, label, id, children }: SectionProps) {
  return (
    <section id={id} className="site-section">
      <div className="site-container">
        {label && (
          <div className="site-eyebrow">
            {num && <span className="site-eyebrow-num">{num}</span>}
            <span>/ {label}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
