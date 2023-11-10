import { slide } from "@/app/common.types";
import React from "react";
import { motion } from "framer-motion";
const SlideBox = ({ active, title, description, left = true }: slide) => {
  return (
    active && (
      <div
        className={`${
          left
            ? "animate-slideLeft right-0 rounded-bl-xl rounded-tl-xl"
            : "animate-slideRight left-0 rounded-br-xl rounded-tr-xl"
        } opacity-0 absolute bottom-20 boxStyle flex flex-col px-24 py-16 bg-stone-400 w-auto h-auto bg-opacity-5  hover:bg-opacity-20`}
      >
        <motion.div
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="overflow-hidden h-auto"
        >
          <p className="text-start text-stone-200 text-xl font-medium">
            {title}
          </p>
        </motion.div>
        <motion.div
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ delay: 2, duration: 0.5 }}
          className="overflow-hidden h-auto"
        >
          <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
            {description}
          </p>
        </motion.div>
      </div>
    )
  );
};

export default SlideBox;
