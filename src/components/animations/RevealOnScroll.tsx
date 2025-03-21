import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  effect?: "fade" | "slide" | "scale" | "rotate" | "flip";
}

const effects = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slide: {
    hidden: (direction: RevealProps["direction"]) => ({
      opacity: 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -15, scale: 0.95 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  flip: {
    hidden: { opacity: 0, rotateX: 90, y: 50 },
    visible: { opacity: 1, rotateX: 0, y: 0 }
  }
};

export const RevealOnScroll = ({
  children,
  width = "100%",
  delay = 0,
  duration = 0.8,
  direction = "up",
  effect = "fade",
  className = "",
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px" 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const selectedEffect = effects[effect];
  const variants = {
    hidden: typeof selectedEffect.hidden === "function" 
      ? selectedEffect.hidden(direction) 
      : selectedEffect.hidden,
    visible: selectedEffect.visible
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
          opacity: { duration: duration * 1.2 }, // Slightly longer fade
          y: { type: "spring", stiffness: 70, damping: 15 }, // Bouncy effect
          x: { type: "spring", stiffness: 70, damping: 15 }, // Bouncy effect
          scale: { type: "spring", stiffness: 100, damping: 20 }, // Elastic effect
          rotate: { type: "spring", stiffness: 100, damping: 20 }, // Elastic effect
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
