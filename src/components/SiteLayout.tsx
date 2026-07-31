import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HoldNotice from "./HoldNotice";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-cream text-ink overflow-x-hidden">
      <div className="bg-ink text-cream text-center text-[11px] md:text-xs tracking-[0.18em] uppercase px-4 py-2.5">
        Website on hold by SR Innovations — under dispute, client payment outstanding
      </div>
      <SiteHeader />
      <main id="top">{children}</main>
      <SiteFooter />
      <HoldNotice />
    </div>
  );
};

export default SiteLayout;
