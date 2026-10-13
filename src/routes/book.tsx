import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Laptop, Phone, Target, User, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Bullet, Container, EASE, PageHero, Section } from "@/components/ui/kit";
import { Success } from "@/components/ui/Success";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/utils/data";
import { img } from "@/utils/images";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Free Football Assessment | Marcus Ridley" },
      { name: "description", content: "Book a free 30-minute football assessment, 1-to-1 coaching, group session or online analysis." },
      { property: "og:title", content: "Book a Session — Marcus Ridley" },
      { property: "og:description", content: "Free assessment, no obligation. Online or in-person." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Book,
});

const TYPES = [
  { id: "Free Assessment", Icon: Target, d: "30 min · No obligation", tag: "Free" },
  { id: "1-to-1 Coaching", Icon: User, d: "60 min · From £60" },
  { id: "Group Session", Icon: Users, d: "60–90 min · From £35" },
  { id: "Online Analysis", Icon: Laptop, d: "Video review · From £40" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="label text-muted-foreground">{label}</span>{children}</label>;
}

function Book() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("Free Assessment");
  const [done, setDone] = useState(false);
  const [age, setAge] = useState("");
  const next = (e: FormEvent) => { e.preventDefault(); step < 2 ? setStep(step + 1) : setDone(true); };
  const steps = ["Session", "Details", "Date"];
  return (
    <>
      <PageHero code="05 / 06 · Book" eyebrow="3 steps · Under 2 minutes" title={["Book a", "Session"]} sub="Start with a free assessment, or jump straight into coaching." image={img("ballNight", "hero")} />
      <Section code="Booking" grid className="bg-pitch py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="plate p-6 md:p-10">
            {done ? (
              <Success text="Thanks. Marcus will confirm your session within 24 hours." onReset={() => { setDone(false); setStep(0); }} />
            ) : (
              <form onSubmit={next}>
                <div className="flex gap-2">
                  {steps.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div className="h-[2px] bg-steel"><motion.div className="h-full origin-left bg-electric" animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} /></div>
                      <p className={cn("mono-tag mt-3 text-[10px]", i <= step ? "text-electric" : "text-muted-foreground")}>0{i + 1} · {s}</p>
                    </div>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: EASE }} className="mt-10 min-h-[340px]">
                    {step === 0 && (
                      <>
                        <h2 className="font-display text-h3 text-chalk">What type of session?</h2>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {TYPES.map(({ id, Icon, d, tag }) => (
                            <button type="button" key={id} onClick={() => setType(id)} className={cn("relative border p-6 text-left transition-colors", type === id ? "border-electric bg-electric/10" : "border-border hover:border-chalk/40")}>
                              {tag && <span className="mono-tag absolute right-4 top-4 bg-gold px-2 py-0.5 text-[9px] text-pitch">{tag}</span>}
                              <Icon className="h-6 w-6 text-electric" strokeWidth={1.5} />
                              <p className="font-display mt-5 text-lg tracking-normal text-chalk">{id}</p>
                              <p className="mono-tag mt-2 text-[10px] text-muted-foreground">{d}</p>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <h2 className="font-display text-h3 text-chalk">Your details</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                          <Field label="Player name *"><input required className="field" placeholder="Full name" /></Field>
                          <Field label="Age *"><input required type="number" min={5} max={60} value={age} onChange={(e) => setAge(e.target.value)} className="field" placeholder="e.g. 13" /></Field>
                          <Field label="Current club (optional)"><input className="field" placeholder="Club name" /></Field>
                          {(age === "" || Number(age) < 18) && <Field label="Parent / guardian name"><input required={age !== "" && Number(age) < 18} className="field" placeholder="If under 18" /></Field>}
                          <Field label="Email *"><input required type="email" className="field" placeholder="you@email.com" /></Field>
                          <Field label="Phone *"><input required type="tel" className="field" placeholder="07..." /></Field>
                          <Field label="Preferred location">
                            <select className="field bg-turf"><option>Warwickshire</option><option>Online</option></select>
                          </Field>
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <h2 className="font-display text-h3 text-chalk">Preferred date</h2>
                        <p className="mono-tag mt-3 text-electric">[ {type} ]</p>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                          <Field label="Date *"><input required type="date" className="field [color-scheme:dark]" /></Field>
                          <Field label="Preferred time"><select className="field bg-turf"><option>Morning (7–11am)</option><option>Afternoon (12–4pm)</option><option>Evening (5–9pm)</option></select></Field>
                          <div className="sm:col-span-2"><Field label="Anything Marcus should know?"><textarea rows={3} className="field resize-none" placeholder="Position, goals, injuries..." /></Field></div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="label flex items-center gap-2 text-chalk/70 hover:text-chalk"><ArrowLeft className="h-4 w-4" />Back</button> : <span />}
                  <button type="submit" className="btn-primary" data-cursor="Book">{step < 2 ? "Continue" : "Confirm booking"} <ArrowRight className="h-4 w-4" /></button>
                </div>
              </form>
            )}
          </div>
          <aside className="space-y-px self-start bg-border">
            <div className="bg-turf p-8">
              <p className="label text-electric">What's included</p>
              <ul className="mt-5 space-y-3"><Bullet>Technical & tactical assessment</Bullet><Bullet>Written feedback within 48 hours</Bullet><Bullet>Recommended programme & plan</Bullet></ul>
            </div>
            <div className="bg-turf p-8">
              <p className="label text-electric">What to bring</p>
              <ul className="mt-5 space-y-3"><Bullet>Boots (3G/AG and FG) and trainers</Bullet><Bullet>Shin pads & water bottle</Bullet><Bullet>Recent match footage (optional)</Bullet></ul>
            </div>
            <div className="bg-turf p-8">
              <p className="label text-electric">Location</p>
              <p className="mt-4 text-chalk/80">Floodlit 3G and grass venues around {BUSINESS.location}. Online sessions nationwide via video call.</p>
              <p className="mono-tag mt-4 text-muted-foreground">[ {BUSINESS.hours} ]</p>
            </div>
          </aside>
        </Container>
      </Section>
      <Section className="bg-turf py-16">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="font-display text-[clamp(28px,4vw,52px)] text-chalk">Prefer to call?</p>
          <a href={BUSINESS.tel} className="btn-primary"><Phone className="h-4 w-4" />{BUSINESS.phone}</a>
        </Container>
      </Section>
    </>
  );
}
