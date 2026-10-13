import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, ShieldCheck, Trophy, BadgeCheck } from "lucide-react";
import { AcademyHero, CtaBlock, Marquee, PathwaySelector, ResultsWall, TestimonialCard } from "@/components/signature/signature";
import { BrandMark, Bullet, Container, Corners, Eyebrow, Img, Reveal, RevealImg, Section, WordReveal } from "@/components/ui/kit";
import { TESTIMONIALS } from "@/utils/data";
import { img, type ImgKey } from "@/utils/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marcus Ridley — Elite Football Education, Warwickshire" },
      { name: "description", content: "UEFA B qualified football coaching for players aged 8–18. Free assessment, online and in-person." },
      { property: "og:title", content: "Marcus Ridley — Football Education" },
      { property: "og:description", content: "Built for the next level. Elite football education for ages 8–18." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const BADGES = [
  { Icon: Trophy, t: "UEFA Qualified", d: "UEFA B Licence holder" },
  { Icon: ShieldCheck, t: "DBS Checked", d: "Enhanced, renewed annually" },
  { Icon: HeartPulse, t: "First Aid Certified", d: "Sports first aid at work" },
  { Icon: BadgeCheck, t: "Insured Coaching", d: "£5m public liability" },
];

const PILLARS: { t: string; d: string; b: string[]; image: ImgKey; span: string }[] = [
  { t: "Technical", d: "The foundation of everything. Mastery of the ball under pressure, with both feet, at speed.", b: ["First touch & receiving", "Passing range", "1v1 & finishing"], image: "bootBall", span: "md:col-span-7" },
  { t: "Tactical", d: "Football intelligence. Understanding space, roles and moments before they happen.", b: ["Scanning habits", "Positional play", "Transitions"], image: "aerial", span: "md:col-span-5 md:mt-24" },
  { t: "Physical", d: "Athletic qualities built age-appropriately to keep players fast, robust and available.", b: ["Speed & agility", "Injury prevention", "Recovery"], image: "ballsLine", span: "md:col-span-5" },
  { t: "Mental", d: "The difference-maker. Composure, resilience and the habits of a professional.", b: ["Confidence", "Decision-making", "Self-review"], image: "tunnel", span: "md:col-span-7 md:-mt-24" },
];

const SESSION: { h: string; p: string; image: ImgKey }[] = [
  { h: "06:45 · The arrival", p: "Cones are down before anyone arrives. Every session has one clear theme — today it's receiving on the half-turn. Players know the focus before they lace their boots.", image: "pitchLine" },
  { h: "07:10 · The work", p: "Short, intense blocks. Hundreds of touches, constant questions. 'What did you see before the ball came?' I stop play rarely, but when I do, it matters.", image: "duel" },
  { h: "08:15 · The review", p: "We finish with a game, then two minutes one-on-one with each player. One thing they did well, one thing to take home. Parents get the same note by evening.", image: "ballNight" },
];

function Home() {
  return (
    <>
      <AcademyHero />
      <Marquee items={["UEFA B Licensed", "200+ Players Developed", "10+ Years Coaching", "Nationwide", "Online & In-Person"]} />

      <Section className="bg-pitch py-16">
        <Container className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {BADGES.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08} className="bg-pitch p-6 md:p-8">
              <Icon className="h-7 w-7 text-electric" strokeWidth={1.5} />
              <p className="font-display mt-5 text-lg tracking-normal text-chalk">{t}</p>
              <p className="mono-tag mt-2 text-[10px] text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </Container>
      </Section>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden py-28">
        <Img src={img("stadiumNight", "hero")} alt="Floodlit stadium" w={2000} h={1333} logo={false} className="absolute inset-0" cursor="Play" />
        <div className="absolute inset-0 bg-pitch/75" />
        <Corners />
        <BrandMark variant="hero" />
        <Container className="relative text-center">
          <p className="mono-tag text-electric">[ Philosophy ]</p>
          <WordReveal as="blockquote" text="Talent isn't given. It's built. Session by session. Rep by rep." className="font-display mx-auto mt-8 max-w-[18ch] text-[clamp(36px,6.5vw,96px)] text-chalk" />
          <p className="mono-tag mt-10 text-gold">— Marcus Ridley</p>
        </Container>
      </section>

      <PathwaySelector />

      <Section code="What we develop" grid className="bg-navy py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>Four pillars</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">What we develop</h2></Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} className={p.span}>
                <article className="group">
                  <div className="overflow-hidden"><div className="transition-transform duration-700 group-hover:scale-[1.03]"><Img src={img(p.image)} alt={`${p.t} football training`} ratio="16/10" cursor="Play" /></div></div>
                  <div className="mt-6 flex items-baseline gap-4"><span className="mono-tag text-electric">0{i + 1}</span><h3 className="font-display text-h3 text-chalk">{p.t}</h3></div>
                  <p className="mt-3 max-w-[48ch] text-chalk/75">{p.d}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">{p.b.map((b) => <Bullet key={b}>{b}</Bullet>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ResultsWall />

      <Section code="Coach's note" className="bg-pitch py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>A session with Marcus</Eyebrow><h2 className="font-display text-h2 mt-6 max-w-[14ch] text-chalk">Tuesday. 06:45. Pitch 3.</h2></Reveal>
          <div className="mt-16 space-y-20">
            {SESSION.map((s, i) => (
              <div key={s.h} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <RevealImg src={img(s.image, "detail")} alt={s.h} w={1600} h={1000} ratio="16/10" cursor="Play" />
                <Reveal>
                  <p className="mono-tag text-gold">[ {s.h} ]</p>
                  <WordReveal text={s.p} className="font-sub mt-5 text-[clamp(20px,2vw,28px)] font-medium leading-snug text-chalk/90" />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section code="Voices" grid className="bg-turf py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>From parents & players</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">Trusted by families</h2></Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr_1fr]">
            {TESTIMONIALS.slice(0, 3).map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
          </div>
          <div className="mt-10"><Link to="/results" className="link-u">More player stories <ArrowRight className="h-4 w-4" /></Link></div>
        </Container>
      </Section>

      <CtaBlock />
    </>
  );
}
