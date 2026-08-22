/** Endless stack ticker. The track is duplicated so the loop is seamless. */
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
