import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { PaperPage } from "./PaperPage";

interface BookSpreadProps {
  id: string;
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export function BookSpread({
  id,
  left,
  right,
  className = "",
  leftClassName = "",
  rightClassName = "",
}: BookSpreadProps) {
  return (
    <motion.section
      id={id}
      data-book-spread={id}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-8 py-5 sm:py-9 lg:py-14 ${className}`}
    >
      <div className="book-spread mx-auto grid max-w-[86rem] overflow-hidden border border-ink/10 shadow-page lg:grid-cols-2">
        <PaperPage side="left" className={leftClassName}>
          {left}
        </PaperPage>
        <PaperPage side="right" className={rightClassName}>
          {right}
        </PaperPage>
      </div>
    </motion.section>
  );
}
