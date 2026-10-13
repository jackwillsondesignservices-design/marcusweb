import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Cursor, Footer, Grain, MobileBar, Navbar, Preloader, ScrollProgress, SmoothScroll } from "@/components/layout/chrome";

function NotFoundComponent() {
  return (
    <section className="pitch-grid relative flex min-h-screen items-center justify-center bg-pitch px-5 pt-20">
      <div className="text-center">
        <p className="mono-tag text-muted-foreground">[ Error · 404 ]</p>
        <h1 className="font-display mt-4 text-[clamp(120px,30vw,320px)] text-electric">404</h1>
        <p className="font-sub mt-2 text-2xl font-semibold uppercase tracking-wide text-chalk">This page has gone off target.</p>
        <Link to="/" className="link-u mt-10 text-sm">Back to the academy →</Link>
        <div className="mono-tag mt-10 flex justify-center gap-6 text-chalk/70">
          <Link to="/" className="hover:text-electric">Home</Link>
          <Link to="/programmes" className="hover:text-electric">Programmes</Link>
          <Link to="/book" className="hover:text-electric">Book</Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marcus Ridley — Football Education" },
      { name: "description", content: "Elite football education for players aged 8–18 in Warwickshire and online." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@500;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "preload", as: "image", href: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=2000&q=80&fm=webp&auto=format&fit=crop" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <motion.div key={path} initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[3px] origin-right bg-electric" />
      <motion.main key={`m-${path}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-x-hidden">
        <Outlet />
      </motion.main>
      <Footer />
      <MobileBar />
      <Grain />
      <Cursor />
    </QueryClientProvider>
  );
}
