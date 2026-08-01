import { useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found | The Restoration Room";
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,follow";
    return () => {
      robots?.remove();
    };
  },[location.pathname]);

  return (
    <SiteLayout>
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-taupe">Error 404</p>
          <h1 className="mt-5 font-display text-4xl md:text-5xl text-ink">This page has drifted away</h1>
          <p className="mt-5 text-taupe leading-relaxed">
            The page you were looking for no longer exists. Explore the treatments or get in touch to book
            your massage in Silverknowes,Edinburgh.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">Back to home</Link>
            <Link to="/contact" className="btn-secondary">Contact &amp; booking</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
