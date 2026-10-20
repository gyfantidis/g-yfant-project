import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import "./site.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bp">
      <SiteNav />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
