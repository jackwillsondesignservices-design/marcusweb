import { createFileRoute } from "@tanstack/react-router";
import { ClubStrip, CtaBlock, PlayerCard, StatsRow } from "@/components/signature/signature";
import { Container, Eyebrow, PageHero, Reveal, Section } from "@/components/ui/kit";
import { PLAYERS, TESTIMONIALS } from "@/utils/data";
import { img } from "@/utils/images";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — Player Signings & Stories | Marcus Ridley" },
      { name: "description", content: "200+ players developed, 47 academy signings, 12 professional contracts. Read their stories." },
      { property: "og:title", content: "The Results — Marcus Ridley" },
      { property: "og:description", content: "Player progression from grassroots to academies and professional football." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

const rot = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]"];

function Results() {
  return (
    <>
      <PageHero code="04 / 06 · Results" eyebrow="Measured progress · Real players" title={["The Results"]} sub="Numbers matter. The players behind them matter more." image={img("stadium", "hero")} />
      <Section code="Stats" grid className="bg-pitch py-24"><Container><StatsRow /></Container></Section>

      <Section code="Player stories" className="bg-turf py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>Success stories</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">Where they are now</h2></Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {PLAYERS.map((p, i) => <div key={p.name} className={i % 4 === 1 || i % 4 === 3 ? "lg:mt-20" : ""}><PlayerCard p={p} tall={i % 3 === 0} /></div>)}
          </div>
          <ClubStrip />
        </Container>
      </Section>

      <Section code="Notes" grid className="bg-navy py-24 md:py-32">
        <Container>
          <Reveal><Eyebrow>Notes from families</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">In their words</h2></Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className={`relative border-l-2 border-gold bg-chalk p-8 text-pitch md:p-10 ${rot[i]}`}>
                  <span className="mono-tag absolute right-5 top-4 text-pitch/50">No. 0{i + 1}</span>
                  <blockquote className="font-sub text-xl font-medium italic leading-snug">“{t.quote}”</blockquote>
                  <figcaption className="mt-8"><p className="font-semibold">{t.name}</p><p className="mono-tag mt-1 text-pitch/60">[ {t.role} ]</p></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBlock title="Start your journey" button="Start your journey" />
    </>
  );
}
