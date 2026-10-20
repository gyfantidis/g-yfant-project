import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import TitleBlock from "@/components/site/TitleBlock";
import "./(site)/site.css";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="bp">
      <SiteNav />
      <main style={{ flex: 1 }}>
        <section className="sheet sec">
          <p className="label">error 404</p>
          <h1 className="h1" style={{ marginTop: 12 }}>
            Sheet not found<span className="c-line">.</span>
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>
            This drawing isn&apos;t in the set. It may have been renumbered, or never drawn.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/" className="btn btn-solid">Back to the index</Link>
            <Link href="/work" className="btn btn-line">See the work</Link>
          </div>
          <div style={{ marginTop: 64 }}>
            <TitleBlock sheet="—" title="404" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
