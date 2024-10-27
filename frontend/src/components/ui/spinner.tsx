import React from "react";
import { motion } from "framer-motion";

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = "#22c55e", // Green-500 from Tailwind, adjust as needed
  thickness = 2,
}) => {
  return (
    <div className="flex items-center justify-center" role="status">
      <motion.span className="sr-only" aria-live="polite">
        Loading...
      </motion.span>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0.33 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.svg>
    </div>
  );
};
