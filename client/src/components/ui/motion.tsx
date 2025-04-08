import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// Fade up animation (for cards, sections, etc.)
export const FadeIn = ({ 
  children, 
  className, 
  delay = 0,
  y = 10,
  x = 0,
  duration = 0.4,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, x }}
      animate={{ 
        opacity: 1,
        y: 0,
        x: 0,
        transition: { 
          duration, 
          delay,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }}
      exit={{ opacity: 0, y, x }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card animation with subtle scale effect
export const ScaleIn = ({ 
  children, 
  className, 
  delay = 0,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          delay,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// For staggered child animations
export const StaggerContainer = ({
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.4
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
};

export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};