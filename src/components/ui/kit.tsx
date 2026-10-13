import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FALLBACK } from "@/utils/images";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const LOGO = {
  sm: "/brand/mr-logo-128.webp",
  md: "/brand/mr-logo-256.webp",
  lg: "/brand/mr-logo-512.webp",
} as const;

/** Brand logo watermark. "tile" sits in the corner of any image; "hero" is the larger badge for full-bleed hero backgrounds. */
export function BrandMark({ variant = "tile", className }: { variant?: "tile" | "hero"; className?: string }) {
  const hero = variant === "hero";
  return (
    <img
      src={hero ? LOGO.md : LOGO.sm}
      srcSet={hero ? `${LOGO.md} 1x, ${LOGO.lg} 2x` : `${LOGO.sm} 1x, ${LOGO.md} 2x`}
      alt=""
      aria-hidden
      width={hero ? 256 : 128}
      height={hero ? 256 : 128}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn(
        "pointer-events-none absolute select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]",
        hero
          ? "bottom-6 right-6 z-[5] hidden h-20 w-20 opacity-95 md:block md:bottom-10 md:right-10 lg:h-28 lg:w-28"
          : "bottom-3 right-3 z-[2] h-[clamp(40px,14%,88px)] w-auto aspect-square opacity-90 md:bottom-4 md:right-4",
        className,
      )}
    />
  );
}

export function Img({
  src, alt, w = 900, h = 600, eager, className, ratio, cursor, logo = true,
}: { src: string; alt: string; w?: number; h?: number; eager?: boolean; className?: string; ratio?: string; cursor?: string; logo?: boolean }) {
  const [s, setS] = useState(src);
  return (
    <div className={cn("relative overflow-hidden bg-pitch", className)} style={ratio && ratio !== "auto" ? { aspectRatio: ratio } : undefined} data-cursor={cursor}>
      <img
        src={s}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
        onError={() => s !== FALLBACK && setS(FALLBACK)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {logo && <BrandMark />}
    </div>
  );
}

export function RevealImg(props: Parameters<typeof Img>[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02, clipPath: "inset(8% 0 8% 0)" }}
      whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={props.className ?? ""}
      style={props.ratio ? { aspectRatio: props.ratio } : {}}
    >
      <Img {...props} className="h-full w-full" ratio="auto" />
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ lines, className, delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  let i = 0;
  return (
    <h1 className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.04em]" aria-hidden>
          {line.split("").map((c, ci) => {
            const d = delay + i++ * 0.04;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: d }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function WordReveal({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" | "blockquote" }) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(to);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Corners({ className }: { className?: string }) {
  const c = "absolute h-4 w-4 border-electric";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-4 md:inset-6", className)}>
      <span className={cn(c, "left-0 top-0 border-l border-t")} />
      <span className={cn(c, "right-0 top-0 border-r border-t")} />
      <span className={cn(c, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(c, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}

export function Section({ children, className, code, grid, id, style }: { children: ReactNode; className?: string; code?: string; grid?: boolean; id?: string; style?: CSSProperties }) {
  return (
    <section id={id} style={style} className={cn("relative overflow-hidden", grid && "pitch-grid", className)}>
      <div className="hairline absolute inset-x-0 top-0" />
      {code && <span className="mono-tag absolute right-5 top-5 text-muted-foreground md:right-8 md:top-8">[ {code} ]</span>}
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label flex items-center gap-3 text-electric", className)}>
      <span className="h-px w-8 bg-electric" />
      {children}
    </p>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-chalk/85">
      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-electric" />
      <span>{children}</span>
    </li>
  );
}

export function PageHero({ code, eyebrow, title, sub, image }: { code: string; eyebrow: string; title: string[]; sub: string; image?: string }) {
  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden pb-16 pt-36 md:pb-24">
      {image ? (
        <>
          <Img src={image} alt="" w={2000} h={1200} eager logo={false} className="absolute inset-0" />
          <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        </>
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="pitch-grid absolute inset-0" />
      <div className="absolute inset-0" style={{ background: "var(--hero-glow)" }} />
      <Corners />
      <BrandMark variant="hero" />
      <Container className="relative text-center">
        <p className="mono-tag mb-6 text-electric">[ {code} ]</p>
        <SplitText lines={title} className="font-display text-h1 text-chalk" />
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.6 }} className="mx-auto mt-8 h-1 w-24 origin-left bg-electric" />
        <Reveal delay={0.7}>
          <p className="label mt-8 text-muted-foreground">{eyebrow}</p>
          <p className="mx-auto mt-4 max-w-[52ch] text-lg text-chalk/80">{sub}</p>
        </Reveal>
      </Container>
    </section>
  );
}
