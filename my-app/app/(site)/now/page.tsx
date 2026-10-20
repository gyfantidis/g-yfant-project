import type { Metadata } from "next";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { NOW } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on this month.",
};

export default function NowPage() {
  return (
    <section className="sheet sec">
      <p className="label">updated {NOW.updated}</p>
      <h1 className="h1" style={{ marginTop: 12 }}>Now</h1>
      <p className="lede" style={{ marginTop: 16 }}>What has my attention this month.</p>
      <div style={{ marginTop: 48 }}>
        <Marker n="01">In progress</Marker>
        <dl className="spec">
          {NOW.items.map((i) => (
            <div key={i.text} style={{ display: "contents" }}>
              <dt>{i.label.toLowerCase()}</dt>
              <dd>{i.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div style={{ marginTop: 64 }}>
        <TitleBlock sheet="05 / 05" title="now" />
      </div>
    </section>
  );
}
