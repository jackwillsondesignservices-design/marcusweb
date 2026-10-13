import { createFileRoute } from "@tanstack/react-router";
import { CtaBlock } from "@/components/signature/signature";
import { Container, Eyebrow, Img, PageHero, Reveal, RevealImg, Section, WordReveal } from "@/components/ui/kit";
import { CREDENTIALS, WEEK } from "@/utils/data";
import { img } from "@/utils/images";

export const Route = createFileRoute("/coaching")({
  head: () => ({
    meta: [
      { title: "The Coach — Marcus Ridley, UEFA B Football Coach" },
      { name: "description", content: "Meet Marcus Ridley: UEFA B licensed coach, 10+ years developing players in Warwickshire and nationwide." },
      { property: "og:title", content: "The Coach — Marcus Ridley" },
      { property: "og:description", content: "Detail. Discipline. Development." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Coaching,
});

const STORY = [
  "I grew up on the pitches around Leamington — muddy Saturday mornings, floodlit Tuesday nights, and a ball that never left my feet.",
  "I came through a club academy myself and was released at sixteen. Nobody told me why. That silence is the reason I coach the way I do: every player I work with knows exactly what they're good at and exactly what to fix.",
  "Over ten years I've coached grassroots teams, academy development squads and hundreds of individual players. The best ones weren't always the most talented. They were the ones who learned how to learn.",
  "Today I work one-to-one and in small groups, in person across Warwickshire and online with players nationwide. Small numbers, high standards, honest feedback.",
  "If you're serious about getting better, I'll be serious about getting you there.",
];

const PHILOSOPHY = [
  { w: "Detail.", d: "The difference between good and great is measured in inches and half-seconds. We coach the inches." },
  { w: "Discipline.", d: "Standards are set in training, not on matchday. Turn up, work hard, repeat — every single session." },
  { w: "Development.", d: "Results matter, but growth matters more. Every plan is built around the player's long-term pathway." },
];

function Coaching() {
  return (
    <>
      <PageHero code="03 / 06 · The Coach" eyebrow="Marcus Ridley · UEFA B" title={["The Coach"]} sub="A decade on the touchline. One obsession: making players better." image={img("touch", "hero")} />

      <Section code="Story" grid className="bg-pitch py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <RevealImg src={img("player16", "detail")} alt="Player training on grass" w={1200} h={1500} ratio="4/5" />
            <p className="mono-tag mt-4 text-muted-foreground">[ Fig. 01 · Training ground, Warwickshire ]</p>
          </div>
          <div>
            <Eyebrow>In my words</Eyebrow>
            <h2 className="font-display text-h2 mt-6 text-chalk">Released at 16. Coaching ever since.</h2>
            <div className="mt-10 space-y-6">
              {STORY.map((p, i) => <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "font-sub text-2xl font-medium leading-snug text-chalk" : "text-lg leading-relaxed text-chalk/80"}>{p}</p></Reveal>)}
            </div>
            <p className="font-display mt-10 text-2xl tracking-normal text-electric">— Marcus</p>
          </div>
        </Container>
      </Section>

      <Section code="Credentials" className="bg-turf py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>Qualifications</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">Qualified. Checked. Insured.</h2></Reveal>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.code} delay={i * 0.06} className="bg-steel p-8">
                <p className="mono-tag text-gold">[ {c.code} ]</p>
                <p className="font-display mt-6 text-2xl tracking-normal text-chalk">{c.title}</p>
                <p className="mono-tag mt-3 text-[10px] text-muted-foreground">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section code="Philosophy" grid className="bg-pitch py-24 md:py-32">
        <Container>
          <Eyebrow>Coaching philosophy</Eyebrow>
          <div className="mt-10 divide-y divide-border">
            {PHILOSOPHY.map((p, i) => (
              <div key={p.w} className="grid gap-4 py-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
                <WordReveal as="h2" text={p.w} className="font-display text-[clamp(52px,10vw,150px)] text-chalk" />
                <Reveal><p className="mono-tag text-electric">0{i + 1}</p><p className="mt-3 max-w-[44ch] text-lg text-chalk/75">{p.d}</p></Reveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section code="A week with Marcus" className="bg-navy py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>Routine</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">A week with Marcus</h2></Reveal>
          <div className="mt-14 grid grid-cols-2 gap-px bg-border sm:grid-cols-4 lg:grid-cols-7">
            {WEEK.map((w, i) => (
              <Reveal key={w.d} delay={i * 0.06} className={`p-6 ${w.d === "Sat" ? "bg-electric text-pitch" : "bg-navy"}`}>
                <p className={`font-display text-3xl tracking-normal ${w.d === "Sat" ? "" : "text-electric"}`}>{w.d}</p>
                <p className={`mono-tag mt-6 text-[10px] ${w.d === "Sat" ? "" : "text-chalk/75"}`}>{w.t}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section code="Moments" className="bg-pitch py-24">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
            <Img src={img("dribble")} alt="Dribbling drill" className="col-span-2 md:col-span-5 md:row-span-2" ratio="4/5" cursor="Play" />
            <Img src={img("goalBlur")} alt="Shot at goal" className="md:col-span-4" ratio="4/3" cursor="Play" />
            <Img src={img("bootsCorner")} alt="Boots on pitch corner" className="md:col-span-3" ratio="1/1" cursor="Play" />
            <Img src={img("coachKids")} alt="Coach with young players" className="md:col-span-3" ratio="1/1" cursor="Play" />
            <Img src={img("sunPitch")} alt="Ball on sunlit pitch" className="col-span-2 md:col-span-4" ratio="4/3" cursor="Play" />
          </div>
        </Container>
      </Section>

      <CtaBlock title="Train with Marcus" />
    </>
  );
}
