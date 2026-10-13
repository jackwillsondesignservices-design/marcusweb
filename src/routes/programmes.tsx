import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { PathwaySelector } from "@/components/signature/signature";
import { Bullet, Container, EASE, Eyebrow, PageHero, Reveal, RevealImg, Section } from "@/components/ui/kit";
import { cn } from "@/lib/utils";
import { PROGRAMMES } from "@/utils/data";
import { img } from "@/utils/images";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Programmes — Marcus Ridley Football Education" },
      { name: "description", content: "Foundation, Development, Elite and 1-to-1 football programmes for players aged 8–18." },
      { property: "og:title", content: "Programmes — Marcus Ridley" },
      { property: "og:description", content: "Every player. Every level. Every session built with purpose." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Programmes,
});

const FILTERS = ["All", ...PROGRAMMES.map((p) => p.stage)];

function Programmes() {
  const [f, setF] = useState("All");
  const list = PROGRAMMES.filter((p) => f === "All" || p.stage === f);
  return (
    <>
      <PageHero code="02 / 06 · Programmes" eyebrow="Ages 8–18 · Warwickshire & online" title={["Programmes"]} sub="Every player. Every level. Every session built with purpose." image={img("ballsLine", "hero")} />
      <div className="sticky top-[72px] z-30 border-y border-border bg-pitch/95 backdrop-blur-sm">
        <Container className="flex gap-2 overflow-x-auto py-4">
          {FILTERS.map((x) => (
            <button key={x} onClick={() => setF(x)} className={cn("label shrink-0 border px-5 py-3 transition-colors", f === x ? "border-electric bg-electric text-pitch" : "border-border text-chalk/70 hover:border-chalk/50")}>{x}</button>
          ))}
        </Container>
      </div>
      <AnimatePresence mode="popLayout">
        {list.map((p, i) => (
          <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Section code={`P-0${PROGRAMMES.indexOf(p) + 1}`} grid={i % 2 === 1} className={i % 2 ? "bg-turf py-20 md:py-28" : "bg-pitch py-20 md:py-28"}>
              <Container className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <RevealImg src={img(p.image, "detail")} alt={`${p.name} session`} w={1600} h={1200} ratio="4/5" className="lg:sticky lg:top-40 lg:self-start" cursor="View" />
                <div>
                  <Reveal>
                    <Eyebrow>{p.stage} · {p.ages}</Eyebrow>
                    <h2 className="font-display mt-6 text-[clamp(36px,5vw,64px)] text-chalk">{p.name}</h2>
                    <p className="mono-tag mt-5 text-muted-foreground">[ {p.spec} ]</p>
                    <p className="mt-6 max-w-[52ch] text-lg text-chalk/80">{p.intro}</p>
                  </Reveal>
                  <Reveal>
                    <p className="label mt-10 text-chalk">What's included</p>
                    <ul className="mt-5 space-y-3">{p.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}</ul>
                  </Reveal>
                  <Reveal>
                    <p className="label mt-10 text-chalk">What you'll develop</p>
                    <div className="mt-5 grid gap-px bg-border sm:grid-cols-3">
                      {p.develops.map((d) => (
                        <div key={d.title} className="bg-pitch p-5">
                          <p className="font-display text-base tracking-normal text-electric">{d.title}</p>
                          <p className="mt-2 text-sm text-chalk/75">{d.text}</p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
                    <span className="mono-tag text-lg text-gold">[ {p.price} ]</span>
                    <Link to="/book" className="link-u" data-cursor="Book">Enquire about this programme <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </Container>
            </Section>
          </motion.div>
        ))}
      </AnimatePresence>
      <PathwaySelector />
      <Section className="bg-electric py-20 text-pitch">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="font-display max-w-[18ch] text-[clamp(32px,5vw,64px)]">Not sure which programme?</h2>
          <Link to="/contact" className="btn-dark">Talk to Marcus <ArrowRight className="h-4 w-4" /></Link>
        </Container>
      </Section>
    </>
  );
}
