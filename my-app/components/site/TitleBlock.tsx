/**
 * The title block from the corner of an engineering drawing.
 * Each page carries one; it's the site's signature, so keep it factual.
 */
export default function TitleBlock({
  sheet,
  title,
  rev = "2026-10",
}: {
  sheet: string;
  title: string;
  rev?: string;
}) {
  return (
    <div className="tblock" aria-hidden="true">
      <div>
        <span>drawing</span>
        {title}
      </div>
      <div>
        <span>drawn by</span>
        G. Yfantidis
      </div>
      <div>
        <span>sheet</span>
        {sheet}
      </div>
      <div>
        <span>rev</span>
        {rev}
      </div>
    </div>
  );
}
