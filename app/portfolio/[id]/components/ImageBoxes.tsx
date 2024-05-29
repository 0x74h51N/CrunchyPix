import { RootState } from "@/store";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useSelector } from "react-redux";

const ImageBoxes = ({
  imageBoxes,
  _id,
}: {
  imageBoxes: string[];
  _id: string;
}) => {
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  return (
    <div className="flex md:flex-row flex-col items-center justify-between w-full h-auto md:mt-24 mt-10 mb-8 gap-6">
      {imageBoxes.map((image: string, index: number) => (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: screenWidth >= 768? 'all' : 0.5 }}
          variants={fadeIn(
            "down",
            "spring",
            screenWidth >= 768 ? index : 0.5,
            1
          )}
          key={index}
        >
          <div className="overflow-hidden flexCenter">
            <CldImage
              width={1200}
              height={1200}
              src={image}
              alt={_id}
              quality="auto"
              fetchPriority="auto"
              key={index}
              className="flex max-w-[400px] w-full h-auto object-contain hover:scale-[1.4] transition-all duration-[5000ms] out-expo"
              style={{
                backgroundImage:
                  _id == "KYK_Electric"
                    ? "linear-gradient(to bottom right,  #e2e8f0, #d6d3d1 90%)"
                    : "linear-gradient(to bottom right,  #171717, #1e293b 90%)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageBoxes;
