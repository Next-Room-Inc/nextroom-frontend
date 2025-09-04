import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Blur: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // or false if you want it to repeat
    threshold: 0.5, // 30% visible before triggering
  });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(8px)", opacity: 0 }}
      animate={
        inView
          ? { filter: "blur(0px)", opacity: 1, scale: 1 }
          : { filter: "blur(8px)",opacity: 0.4, }
      }
      transition={{ duration: 0.80, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Blur;
