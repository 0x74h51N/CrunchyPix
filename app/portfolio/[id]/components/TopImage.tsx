import { Icon } from "@/app/common.types";
import IconButton from "@/components/Buttons/IconButton";
import useBlurUrl from "@/hooks/useBlurUrl";
import { RootState } from "@/store";
import { slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useSelector } from "react-redux";

const TopImage = ({
  imageTop,
  imageTopMobile,
  imageAlt,
  icons,
}: {
  imageTop: string;
  imageTopMobile?: string;
  imageAlt: string;
  icons?: Icon[];
}) => {
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );

  const blurUrl = useBlurUrl(screenWidth <= 768 && imageTopMobile ? imageTopMobile : imageTop)
  
  return (
    <div
      className={`relative w-full h-auto overflow-hidden ${
        imageTop.includes("catalog")
          ? "lg:min-h-[870px] md:min-h-[700px]"
          : "md:min-h-[700px]"
      } min-h-[600px]`}
      style={{
        backgroundImage: imageTop.includes("kyk")
          ? "linear-gradient(to bottom right,  #e2e8f0, #d6d3d1)"
          : "linear-gradient(to bottom right,  #171717, #334155)",
      }}
    >  {blurUrl  && 
        <CldImage
          fill
          sizes="auto"
          fetchPriority="auto"
          quality={100}
          src={screenWidth <= 768 && imageTopMobile ? imageTopMobile : imageTop}
          alt={imageAlt}
          placeholder="blur"
          blurDataURL={blurUrl}
          className={`w-full h-full object-cover transition-opacity duration-500`}
        />}
      {icons && (
        <motion.div
          variants={slideIn("right", "spring", 2, 1)}
          className="absolute flex flex-row gap-4 bottom-5 py-3 right-0 pr-6 pl-4 bg-black bg-opacity-50 rounded-l-lg"
        >
          {icons.map((icon, iconIndex) => (
            <span
              key={iconIndex}
              className="hover:text-log-col transition-all ease-in-out duration-300 text-cool-gray-50 lg:text-4xl text-2xl"
            >
              <IconButton key={iconIndex} icon={icon} />
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TopImage;
