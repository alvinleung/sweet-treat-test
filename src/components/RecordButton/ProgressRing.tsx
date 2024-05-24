import React from "react";
import { motion, useIsPresent } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

interface Props {
  strokeColor?: string;
  radius?: number;
  stroke?: number;
  progress?: number;
  counterClockwise?: boolean;
}

export const ProgressRing = ({
  strokeColor = "black",
  radius = 16,
  stroke = 3,
  progress = 0,
  counterClockwise = false,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const isPresent = useIsPresent();

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      style={{
        transform: `${counterClockwise ? "scaleX(-1)" : ""} rotate(-90deg)`,
        display: "block",
      }}
    >
      <motion.circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        // animate
        animate={{
          opacity: 1,
          strokeDashoffset: isPresent ? strokeDashoffset : 0,
        }}
        initial={{ opacity: 0, strokeDashoffset: 0 }}
        exit={{ opacity: 0, strokeDashoffset: 0 }}
        transition={{ easings: "linear", duration: 0.01 }}
      />
      <motion.circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        opacity={0.2}
      />
    </svg>
  );
};
