import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Container, EASE, Eyebrow, PageHero, Reveal, Section } from "@/components/ui/kit";
import { Success } from "@/components/ui/Success";
import { BUSINESS, FAQ } from "@/utils/data";
import { img } from "@/utils/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Marcus Ridley — Football Coach, Leamington Spa" },
      { name: "description", content: "Get in touch about programmes, 1-to-1 coaching or a free assessment. Call 07943 310137." },
      { property: "og:title", content: "Get in Touch — Marcus Ridley" },
      { property: "og:description", content: "Replies within 24 hours. Warwickshire and nationwide online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const blocks = [
    { k: "Coach", v: BUSINESS.name },
    { k: "Phone", v: BUSINESS.phone, href: BUSINESS.tel },
    { k: "Email", v: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { k: "Based", v: BUSINESS.location },
    { k: "Coverage", v: "Nationwide · Online available" },
    { k: "Hours", v: BUSINESS.hours },
  ];
  return (
    <>
      <PageHero code="06 / 06 · Contact" eyebrow="Replies within 24 hours" title={["Get in", "touch"]} sub="Questions about programmes, pricing or your child's next step — ask away." image={img("pitchLine", "hero")} />
      <Section code="Enquiry" grid className="bg-pitch py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="plate p-6 md:p-10">
            {sent ? <Success text="Thanks. Marcus will reply within 24 hours." onReset={() => setSent(false)} /> : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-7 sm:grid-cols-2">
                <h2 className="font-display text-h3 text-chalk sm:col-span-2">Send a message</h2>
                <label><span className="label text-muted-foreground">Name *</span><input required className="field" placeholder="Your name" /></label>
                <label><span className="label text-muted-foreground">Email *</span><input required type="email" className="field" placeholder="you@email.com" /></label>
                <label><span className="label text-muted-foreground">Phone</span><input type="tel" className="field" placeholder="07..." /></label>
                <label><span className="label text-muted-foreground">Subject</span><select className="field bg-turf"><option>Programme enquiry</option><option>1-to-1 booking</option><option>General</option></select></label>
                <label className="sm:col-span-2"><span className="label text-muted-foreground">Message *</span><textarea required rows={5} className="field resize-none" placeholder="Tell Marcus about the player..." /></label>
                <div className="sm:col-span-2"><button className="btn-primary">Send message <ArrowRight className="h-4 w-4" /></button></div>
              </form>
            )}
          </div>
          <div className="divide-y divide-border border-y border-border">
            {blocks.map((b) => (
              <div key={b.k} className="flex flex-col gap-1 py-5">
                <span className="label text-electric">{b.k}</span>
                {b.href ? <a href={b.href} className="font-sub break-words text-lg font-semibold text-chalk hover:text-electric">{b.v}</a> : <span className="font-sub text-lg font-semibold text-chalk">{b.v}</span>}
              </div>
            ))}
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="link-u py-6">Message on WhatsApp <ArrowRight className="h-4 w-4" /></a>
          </div>
        </Container>
      </Section>
      <Section code="FAQ" className="bg-turf py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal><Eyebrow>Common questions</Eyebrow><h2 className="font-display text-h2 mt-6 text-chalk">Quick answers</h2></Reveal>
          <div className="border-t border-border">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-sub text-lg font-semibold text-chalk"><span className="mono-tag mr-4 text-electric">0{i + 1}</span>{f.q}</span>
                  <Plus className={`h-5 w-5 shrink-0 text-electric transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="max-w-[60ch] pb-6 text-chalk/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
