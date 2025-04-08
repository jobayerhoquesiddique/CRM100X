import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}

// Default animations
const defaultAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={cn("", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { ...defaultAnimations.initial },
        animate: { 
          ...defaultAnimations.animate,
          transition: { 
            ...defaultAnimations.transition,
            delay 
          }
        },
        exit: { ...defaultAnimations.exit }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          delay
        }
      }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedFade({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: {
          duration: 0.3, 
          delay
        } 
      }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSlide({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedContainerProps & { direction?: "left" | "right" | "up" | "down" }) {
  const direction = props.direction || "up";
  
  const variants = {
    left: { x: -20, opacity: 0 },
    right: { x: 20, opacity: 0 },
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 }
  };

  return (
    <motion.div
      className={cn("", className)}
      initial={variants[direction]}
      animate={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
          delay
        }
      }}
      exit={variants[direction]}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: AnimatedContainerProps & { staggerDelay?: number }) {
  return (
    <motion.div
      className={cn("", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { 
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                delay: i * staggerDelay
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  exit: { opacity: 0 }
};