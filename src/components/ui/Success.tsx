import { motion } from "framer-motion";
import { EASE } from "./kit";

export function Success({ text, onReset }: { text: string; onReset?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col items-center py-16 text-center">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" className="text-electric">
        <motion.circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE }} />
        <motion.path d="M28 49 L42 63 L68 35" stroke="currentColor" strokeWidth="4" strokeLinecap="square" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5, ease: EASE }} />
      </svg>
      <p className="font-display mt-8 text-4xl text-chalk">Confirmed.</p>
      <p className="mt-4 max-w-[40ch] text-lg italic text-chalk/80">{text}</p>
      {onReset && <button onClick={onReset} className="link-u mt-8">Send another</button>}
    </motion.div>
  );
}
