import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

type ParallaxImageType = {
  imageSource: string;
  alt: string;
};

const ParallaxImage = ({ imageSource, alt }: ParallaxImageType) => {
  const [offsetY, setOffsetY] = useState(0);
  const controls = useAnimation();

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <motion.div
        style={{ y: offsetY * -1, height: "100%", width: "100%" }}
        className={`absolute w-full h-full overflow-hidden shadow-2xl shadow-black ${imageSource}`}
      ></motion.div>
    </div>
  );
};

export default ParallaxImage;
