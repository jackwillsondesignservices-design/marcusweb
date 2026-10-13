import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CLUBS, PLAYERS, PROGRAMMES, STATS, TESTIMONIALS } from "@/utils/data";
import { img } from "@/utils/images";
import { BrandMark, Bullet, Container, Corners, Counter, EASE, Eyebrow, Img, Reveal, RevealImg, Section, SplitText } from "@/components/ui/kit";

export function AcademyHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-28 pt-32">
      <Img src={img("nightPitch", "hero")} alt="Floodlit football pitch during evening training" w={2000} h={1333} eager logo={false} className="absolute inset-0" />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="absolute inset-0" style={{ background: "var(--hero-glow)" }} />
      <div className="pitch-grid absolute inset-0" />
      <div aria-hidden className="animate-breathe absolute left-[10%] top-[40%] h-[40vh] w-[40vw] max-w-[600px] rounded-full bg-electric/10 blur-3xl" />
      <Corners />
      <BrandMark variant="hero" />

      <div className="absolute right-5 top-24 z-10 hidden items-center sm:flex gap-3 border border-border bg-pitch/70 px-3 py-2 md:right-10">
        <span className="animate-pulse-dot h-2 w-2 rounded-full bg-electric" />
        <span className="mono-tag text-[10px] text-chalk">Now booking · Spring 2026</span>
      </div>

      <Container className="relative">
        <p className="mono-tag mb-8 text-electric">[ Football Education · Warwickshire · Nationwide ]</p>
        <SplitText lines={["Built", "for the", "next level."]} className="font-display text-hero text-chalk" delay={0.2} />
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.8, ease: EASE }} className="mt-8 h-1 w-[100px] origin-left bg-electric" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease: EASE }}>
          <p className="mt-8 max-w-[52ch] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-chalk/80">
            Elite football education for players aged 8–18. Technical development, game intelligence, and career pathways — delivered by a UEFA-qualified coach. Online and in-person.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/book" className="btn-primary" data-cursor="Book">Book a free assessment <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/programmes" className="btn-ghost" data-cursor="View">View programmes</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["UEFA B Licensed", "10+ Years Coaching", "200+ Players Developed"].map((p) => (
              <span key={p} className="mono-tag border border-chalk/25 px-3 py-1.5 text-[10px] text-chalk/80">[ {p} ]</span>
            ))}
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-6 z-10">
        <Container className="mono-tag flex items-end justify-between text-[10px] text-chalk/60">
          <span>[ Scroll to explore ]</span>
          <span className="relative hidden h-14 w-px bg-chalk/20 sm:block"><span className="animate-travel absolute -left-[2px] top-0 h-[5px] w-[5px] bg-electric" /></span>
          <span>[ 01 / 06 ]</span>
        </Container>
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-turf py-5">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="font-display flex items-center gap-10 whitespace-nowrap text-2xl tracking-normal text-chalk/90">
            {t}<span className="h-2 w-2 bg-electric" />
          </span>
        ))}
      </div>
    </div>
  );
}

const accentText = { electric: "text-electric", gold: "text-gold", flare: "text-flare", slate: "text-slate" } as const;
const accentBg = { electric: "bg-electric", gold: "bg-gold", flare: "bg-flare", slate: "bg-slate" } as const;

export function PathwaySelector() {
  const [active, setActive] = useState(0);
  const p = PROGRAMMES[active] ?? PROGRAMMES[0]!;
  return (
    <Section code="M2 · The Pathway" grid className="bg-pitch py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>The player pathway</Eyebrow>
          <h2 className="font-display text-h2 mt-6 max-w-[16ch] text-chalk">One journey. Four stages.</h2>
        </Reveal>
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-border" />
          <div className="relative grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {PROGRAMMES.map((x, i) => (
              <button key={x.id} onClick={() => setActive(i)} className="group text-left" data-cursor="View">
                <span className={cn("block h-[22px] w-[22px] border-2 border-pitch transition-transform duration-300", accentBg[x.accent], i === active ? "scale-110" : "opacity-50 group-hover:opacity-100")} />
                <span className={cn("font-display mt-4 block text-xl tracking-normal transition-colors md:text-2xl", i === active ? "text-chalk" : "text-chalk/45 group-hover:text-chalk/80")}>{x.stage}</span>
                <span className="mono-tag mt-1 block text-muted-foreground">{x.ages}</span>
                <span className={cn("mt-3 block h-[2px] origin-left bg-electric transition-transform duration-500", i === active ? "scale-x-100" : "scale-x-0")} style={{ width: "70%" }} />
              </button>
            ))}
          </div>
        </div>
        <div className="plate relative mt-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }} className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="p-6 md:p-12">
                <p className={cn("mono-tag", accentText[p.accent])}>[ Stage 0{active + 1} · {p.stage} ]</p>
                <h3 className="font-display text-h3 mt-4 text-chalk">{p.name}</h3>
                <p className="mono-tag mt-4 text-muted-foreground">[ {p.spec} ]</p>
                <ul className="mt-8 space-y-3">{p.bullets.slice(0, 5).map((b) => <Bullet key={b}>{b}</Bullet>)}</ul>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <span className="mono-tag text-base text-gold">[ {p.price} ]</span>
                  <Link to="/book" className="link-u">Enquire about this programme <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
              <Img src={img(p.image, "detail")} alt={`${p.name} training`} w={1600} h={1100} className="min-h-[280px]" cursor="View" />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="border-b border-r border-border p-6 md:p-10">
          <p className="font-display text-[clamp(48px,7vw,96px)] text-electric"><Counter to={s.value} suffix={s.suffix} /></p>
          <p className="mono-tag mt-3 text-chalk/70">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function PlayerCard({ p, tall }: { p: (typeof PLAYERS)[number]; tall?: boolean }) {
  return (
    <Reveal>
      <article className="group">
        <div className="overflow-hidden">
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
            <Img src={img(p.image)} alt={p.name} ratio={tall ? "3/4" : "4/3"} cursor="View" />
          </div>
        </div>
        <div className="hairline mt-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        <p className="font-sub mt-5 text-xl font-semibold text-chalk">{p.name}</p>
        <p className="mono-tag mt-2 text-gold">[ {p.tag} ]</p>
        <p className="mt-3 text-[15px] italic text-chalk/70">“{p.quote}”</p>
      </article>
    </Reveal>
  );
}

export function ClubStrip() {
  return (
    <div className="mt-16">
      <p className="label text-muted-foreground">Where they've moved to</p>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
        {CLUBS.map((c) => (
          <span key={c} className="mono-tag flex items-center gap-3 text-[13px] text-chalk/85">
            <span className="flex h-7 w-7 items-center justify-center border border-electric/50 text-[9px] text-electric">{c.split(" ").map((w) => w[0]).join("")}</span>{c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResultsWall() {
  return (
    <Section code="M3 · Results Wall" className="bg-turf py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Proof, not promises</Eyebrow>
          <h2 className="font-display text-h2 mt-6 text-chalk">The results</h2>
        </Reveal>
        <div className="mt-14"><StatsRow /></div>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          {PLAYERS.slice(0, 4).map((p, i) => <div key={p.name} className={i % 2 ? "lg:mt-16" : ""}><PlayerCard p={p} tall={i % 2 === 0} /></div>)}
        </div>
        <ClubStrip />
        <div className="mt-12"><Link to="/results" className="link-u">Read full stories <ArrowRight className="h-4 w-4" /></Link></div>
      </Container>
    </Section>
  );
}

export function TestimonialCard({ t, i }: { t: (typeof TESTIMONIALS)[number]; i: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <figure className="plate relative flex h-full flex-col justify-between p-8 md:p-10">
        <span className="font-display absolute right-6 top-4 text-6xl text-electric/20">“</span>
        <blockquote className="text-lg italic leading-relaxed text-chalk/90">{t.quote}</blockquote>
        <figcaption className="mt-10 border-t border-border pt-5">
          <p className="font-sub font-semibold text-chalk">{t.name}</p>
          <p className="mono-tag mt-1 text-electric">[ {t.role} ]</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function CtaBlock({ title = "Ready to start?", button = "Book your free assessment" }: { title?: string; button?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [o, setO] = useState({ x: 0, y: 0 });
  return (
    <section className="relative overflow-hidden bg-electric py-24 text-pitch md:py-32">
      <Container className="relative text-center">
        <p className="mono-tag text-pitch/70">[ Free assessment · Limited spring places ]</p>
        <h2 className="font-display mx-auto mt-6 max-w-[14ch] text-[clamp(48px,10vw,140px)]">{title}</h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg text-pitch/80">A 30-minute session to see where your game is, where it could go, and exactly how we'd get there.</p>
        <div className="mt-10 flex justify-center">
          <Link
            ref={ref}
            to="/book"
            data-cursor="Book"
            onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setO({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35 }); }}
            onMouseLeave={() => setO({ x: 0, y: 0 })}
            style={{ transform: `translate3d(${o.x}px,${o.y}px,0)`, transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)" }}
            className="btn-dark"
          >
            {button} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mono-tag mt-8 text-pitch/70">[ No obligation · 30-min session · Online or in-person ]</p>
      </Container>
    </section>
  );
}

export { RevealImg };
