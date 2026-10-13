import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Calendar, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/utils/data";
import { Container, EASE, LOGO } from "@/components/ui/kit";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/programmes", label: "Programmes" },
  { to: "/coaching", label: "The Coach" },
  { to: "/results", label: "Results" },
  { to: "/contact", label: "Contact" },
] as const;

export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const lenisRef = useRef<{ scrollTo: (t: number, o?: object) => void; destroy: () => void; raf: (t: number) => void } | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let alive = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      const l = new Lenis({ lerp: 0.08 });
      lenisRef.current = l as never;
      const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { alive = false; cancelAnimationFrame(raf); lenisRef.current?.destroy(); };
  }, []);
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [path]);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-electric" />;
}

export function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-screen">
      <svg className="h-full w-full">
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0.8  0 0 0 0 0.9  0 0 0 0 1  0 0 0 1 0" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </div>
  );
}

export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("mr-pre")) return setShow(false);
    const t = setTimeout(() => { setShow(false); sessionStorage.setItem("mr-pre", "1"); }, 1400);
    return () => clearTimeout(t);
  }, []);
  const words = "MARCUS RIDLEY · FOOTBALL EDUCATION".split("");
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pitch">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="text-electric">
            <motion.path d="M6 74 V6 L30 44 L54 6 V74 M70 74 V6 H96 Q114 6 114 24 Q114 42 96 42 H70 M92 42 L114 74" stroke="currentColor" strokeWidth="4" strokeLinecap="square" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE }} />
          </svg>
          <p className="mono-tag mt-8 text-chalk">
            {words.map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.02 }}>{c}</motion.span>
            ))}
          </p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.6, ease: EASE }} className="mt-6 h-px w-48 origin-left bg-electric" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    document.body.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const el = (e.target as HTMLElement).closest("[data-cursor],a,button") as HTMLElement | null;
      setLabel(el?.dataset["cursor"] ?? "");
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px,${y - 3}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 28}px,${ry - 28}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.classList.remove("has-cursor"); };
  }, []);
  if (!on) return null;
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 bg-electric" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[90] flex h-14 w-14 items-center justify-center">
        <span className={`absolute rounded-full border border-electric transition-all duration-300 ${label ? "h-14 w-14 bg-electric" : "h-8 w-8 opacity-30"}`} />
        <span className={`label relative text-[8px] text-pitch transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "border-b border-border bg-pitch/90 backdrop-blur-sm" : ""}`}>
        <Container className="flex h-[72px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="MR Football Coaching Academy — Home">
            <img src={LOGO.sm} srcSet={`${LOGO.sm} 1x, ${LOGO.md} 2x`} alt="MR Football Coaching Academy logo" width={52} height={52} className="h-[52px] w-[52px] shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            <span className="hidden leading-tight sm:block">
              <span className="font-display block text-sm tracking-normal text-chalk">Marcus Ridley</span>
              <span className="mono-tag block text-[9px] text-muted-foreground">Football Education</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="label relative flex items-center gap-2 text-chalk/70 transition-colors hover:text-chalk" activeOptions={{ exact: true }} activeProps={{ className: "!text-chalk" }}>
                {({ isActive }) => (<>{isActive && <span className="h-1.5 w-1.5 bg-electric" />}{n.label}</>)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/book" className="btn-primary hidden !px-5 !py-3 sm:inline-flex" data-cursor="Book">Free Assessment</Link>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-border lg:hidden">
              <span className="h-px w-5 bg-chalk" /><span className="h-px w-5 bg-chalk" />
            </button>
          </div>
        </Container>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease: EASE }} className="pitch-grid fixed inset-0 z-[80] flex flex-col bg-pitch">
            <Container className="flex h-[72px] items-center justify-between">
              <span className="mono-tag text-electric">[ MENU ]</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center border border-border"><X className="h-5 w-5" /></button>
            </Container>
            <Container className="flex flex-1 flex-col justify-center gap-2">
              {[...NAV, { to: "/book", label: "Book" } as const].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASE }}>
                  <Link to={n.to} className="font-display flex items-baseline gap-4 text-[clamp(40px,11vw,72px)] text-chalk hover:text-electric">
                    <span className="mono-tag text-electric">0{i + 1}</span>{n.label}
                  </Link>
                </motion.div>
              ))}
            </Container>
            <Container className="mono-tag flex flex-wrap justify-between gap-2 pb-8 text-muted-foreground">
              <a href={BUSINESS.tel}>{BUSINESS.phone}</a><span>Warwickshire · Nationwide</span>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-pitch pb-28 pt-20 lg:pb-10">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/" aria-label="MR Football Coaching Academy — Home" className="shrink-0">
              <img src={LOGO.md} srcSet={`${LOGO.md} 1x, ${LOGO.lg} 2x`} alt="MR Football Coaching Academy logo" width={160} height={160} loading="lazy" className="h-28 w-28 drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:h-40 md:w-40" />
            </Link>
            <div>
              <p className="font-display text-[clamp(40px,8vw,112px)] text-chalk">Marcus Ridley</p>
              <p className="font-display mt-2 text-[clamp(20px,3vw,40px)] text-electric">Football Education</p>
            </div>
          </div>
          <div className="mono-tag space-y-2 text-chalk/70 md:text-right">
            <a className="block hover:text-electric" href={BUSINESS.tel}>T · {BUSINESS.phone}</a>
            <a className="block normal-case hover:text-electric" href={`mailto:${BUSINESS.email}`}>E · {BUSINESS.email}</a>
            <p>B · {BUSINESS.location}</p>
            <p>H · {BUSINESS.hours}</p>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[...NAV, { to: "/book", label: "Book" } as const].map((n) => (
              <Link key={n.to} to={n.to} className="label text-chalk/70 hover:text-electric">{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <span className="mono-tag text-muted-foreground">© 2026 · UEFA B · DBS Checked</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="flex h-11 w-11 items-center justify-center border border-electric text-electric transition-colors hover:bg-electric hover:text-pitch"><ArrowUp className="h-4 w-4" /></button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function MobileBar() {
  const items = [
    { href: BUSINESS.tel, label: "Call", Icon: Phone },
    { href: BUSINESS.whatsapp, label: "WhatsApp", Icon: MessageCircle },
  ];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-turf lg:hidden">
      <a href={BUSINESS.tel} className="label flex items-center justify-center gap-2 py-4 text-chalk"><Phone className="h-4 w-4 text-electric" />Call</a>
      <Link to="/book" className="label flex items-center justify-center gap-2 bg-electric py-4 text-pitch"><Calendar className="h-4 w-4" />Book</Link>
      <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="label flex items-center justify-center gap-2 py-4 text-chalk"><MessageCircle className="h-4 w-4 text-electric" />WhatsApp</a>
    </div>
  );
}
