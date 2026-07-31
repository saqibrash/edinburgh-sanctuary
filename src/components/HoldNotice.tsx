import { useState } from "react";

/**
 * Non-dismissible account-hold notice.
 * Displayed while the website is withheld pending payment.
 */
const HoldNotice = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 10, y: px * 12 });
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="hold-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-ink/70 backdrop-blur-md"
      style={{ perspective: "1200px" }}
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative w-full max-w-lg transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* stacked layers for depth */}
        <div
          className="absolute inset-0 rounded-2xl bg-gold/25"
          style={{ transform: "translateZ(-40px) scale(0.97)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-2xl bg-rose/25"
          style={{ transform: "translateZ(-20px) scale(0.985)" }}
          aria-hidden
        />

        <div
          className="relative rounded-2xl border border-gold/50 bg-cream px-7 py-9 md:px-10 md:py-11 text-center shadow-[0_50px_120px_-40px_rgba(60,35,25,0.75)]"
          style={{ transform: "translateZ(0)" }}
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-blush/50 text-3xl text-rose shadow-[0_18px_40px_-18px_rgba(120,80,60,0.6)]"
            style={{ transform: "translateZ(50px)" }}
            aria-hidden
          >
            !
          </div>

          <div className="eyebrow mb-4">Website Suspended</div>

          <h2
            id="hold-title"
            className="font-display text-3xl md:text-[40px] leading-[1.1] text-ink"
            style={{ transform: "translateZ(30px)" }}
          >
            This website is <span className="font-script text-rose">on hold</span>
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-taupe">
            This website has been placed on hold by <strong className="text-ink">SR Innovations</strong> because
            the client has not paid the agreed amount for the work completed.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-taupe">
            The site is currently under dispute. All business contact details and booking
            functionality have been withheld until the outstanding payment is settled.
          </p>

          <div className="mt-7 rounded-xl border border-blush bg-blush/30 px-5 py-4 text-[13px] leading-relaxed text-ink/80">
            Design, development and all website content remain the property of SR Innovations
            until payment is received in full.
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-taupe">
            SR Innovations · Payment Dispute Notice
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoldNotice;
