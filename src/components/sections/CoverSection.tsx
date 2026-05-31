import { motion } from "framer-motion";
import { BookHero } from "../book/BookHero";

interface CoverSectionProps {
  id?: string;
}

export function CoverSection({ id = "cover" }: CoverSectionProps) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen scroll-mt-8 items-center justify-center overflow-hidden py-20"
    >
      <div className="absolute left-1/2 top-1/2 h-[72vh] w-px -translate-x-1/2 -translate-y-1/2 bg-ink/10" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="absolute bottom-8 left-0 hidden font-mono text-[0.55rem] uppercase tracking-editorial text-graphite sm:block"
      >
        Scroll to open the portfolio
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite sm:block"
      >
        Digital notebook / volume 01
      </motion.p>
      <BookHero />
    </section>
  );
}
