import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-px bg-ink/10"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-ink"
        style={{ scaleX }}
      />
    </div>
  );
}
