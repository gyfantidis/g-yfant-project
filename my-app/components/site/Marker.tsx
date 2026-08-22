/** Section marker: "§ 02 — SELECTED WORK ................ 5 ENTRIES" */
export default function Marker({
  num,
  label,
  rest,
}: {
  num: string;
  label: string;
  rest?: string;
}) {
  return (
    <div className="marker">
      <span className="marker-num">§ {num}</span>
      <span className="marker-label">{label}</span>
      {rest && <span className="marker-rest">{rest}</span>}
    </div>
  );
}
