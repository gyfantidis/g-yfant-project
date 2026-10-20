/** Section heading on a rule: "02 ── Selected work". */
export default function Marker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="marker">
      <b>{n}</b>
      <span>{children}</span>
    </div>
  );
}
