import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface BookShellProps {
  children: ReactNode;
}

export function BookShell({ children }: BookShellProps) {
  return (
    <motion.div
      data-book-shell
      initial={{ opacity: 0, y: 48, rotateX: 7 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="book-cover relative mx-auto aspect-[0.74/1] w-[min(82vw,31rem)] overflow-hidden border border-white/10 bg-ink p-5 text-paper shadow-book sm:p-7"
    >
      <div className="absolute inset-y-0 left-[7%] w-px bg-white/20" />
      <div className="absolute inset-4 border border-paper/25 sm:inset-6" />
      <div className="absolute inset-7 border border-paper/10 sm:inset-10" />
      <div className="relative flex h-full flex-col justify-between border-l border-paper/15 p-6 sm:p-9">
        {children}
      </div>
    </motion.div>
  );
}
