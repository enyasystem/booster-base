import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
}

export const RevealOnScroll = ({
  children,
  width = "100%",
  className = "",
}: RevealProps) => {
  return (
    <div style={{ width }} className={className}>
      {children}
    </div>
  );
};
