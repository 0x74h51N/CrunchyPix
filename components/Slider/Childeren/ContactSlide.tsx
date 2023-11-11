import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
interface ContactSlideProps {
  active: boolean;
}
const ContactSlide: React.FC<ContactSlideProps> = ({ active }) => {
  return (
    active && (
      <div className="h-full w-full absolute flex flex-row justify-center items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          className="h-auto w-auto rounded-full"
        >
          <Image
            src="/"
            alt="Photo"
            layout="filled"
            width={100}
            height={100}
            objectFit="cover"
            className="rounded-full object-center mr-6"
          />
        </motion.div>
        <motion.div
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex items-center">
            <p className="text-start text-stone-200 text-3xl font-bold">
              Contact With Me
            </p>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default ContactSlide;
