import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const transition = (OriginalComponent: any) => {
  return function WithTransition(props: any) {
    return (
      <AnimatePresence>
        <motion.div
          key="overlay"
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <OriginalComponent {...props} />
        </motion.div>
      </AnimatePresence>
    );
  };
};

export default transition;
