import SvgAnimator from "@/components/SvgAnimator";
import { RootState } from "@/store";
import { rotateChange, setRotate } from "@/store/redux/mobileRotate";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { designSectPaths } from "@/constants/designSectPath";

interface PhoneFrameProps {
  screenImage?: string;
  children?: React.ReactNode;
}
const PhoneFrame = ({ screenImage, children }: PhoneFrameProps) => {
  const dispatch = useDispatch();
  const [isRotating, setIsRotating] = useState(false);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const rotateStart = useSelector(
    (state: RootState) => state.rotateChange.rotateStart
  );
  const rotateEnd = useSelector(
    (state: RootState) => state.rotateChange.rotateEnd
  );
  const [isInView, setIsInView] = useState(false);
  const handleClick = () => {
    if (rotateStart) {
      dispatch(setRotate(false));
    } else if (!rotateStart) {
      dispatch(setRotate(true));
    }
  };
  const handleInViewChange = () => {
    if (isInView === false) {
      setTimeout(() => {
        setIsInView(true);
      }, 1200);
    } else {
      setIsInView(false);
    }
  };
  useEffect(() => {
    const rotationTimeout = setTimeout(() => {
      rotateStart
        ? dispatch(rotateChange(true))
        : dispatch(rotateChange(false));
    }, 500);

    return () => clearTimeout(rotationTimeout);
  }, [rotateStart]);

  useEffect(() => {
    setIsRotating(true);
    const rotationTimeout = setTimeout(() => {
      setIsRotating(false);
    }, 500);

    return () => clearTimeout(rotationTimeout);
  }, [rotateStart]);

  return (
    <div
      className={`relative delay-500 ${
        rotateStart
          ? ` w-[600px] h-[300px]`
          : isMobile
          ? "w-[200px] h-[400px]"
          : `w-[300px] h-[600px]`
      }
      ${!rotateStart && "transition-all ease-in"} `}
    >
      <div
        className={`absolute w-full h-full top-0 left-0 flex flex-1 items-center justify-center pointer-events-none `}
      >
        <Image
          width={295}
          height={600}
          quality={100}
          loading="lazy"
          src="/phone.svg"
          alt="Phone Frame"
          style={{
            transform: `rotate(${rotateStart ? 90 : 0}deg)`,
            transition: "transform 0.5s ease",
            zIndex: 150,
          }}
        />
      </div>
      <motion.div
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => handleInViewChange()}
        onViewportLeave={() => handleInViewChange()}
      >
        {isInView && !isMobile && (
          <button onClick={handleClick} className={`group`}>
            {!rotateEnd && !rotateStart ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 23"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute -right-28 -top-14 w-[170px] h-[150px] rounded-xl -z-20 path-animation -rotate-[30deg] group-hover:stroke-log-col`}
              >
                <SvgAnimator
                  paths={[
                    { d: "M 0 0 C 7 0 14 4 14 12 L 16 9 L 14 12 L 12 10" },
                  ]}
                  repeat
                  direction="back"
                  duration={1}
                  pathDelay={0}
                  delay={1}
                />
              </svg>
            ) : (
              !isRotating && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute w-[40px] h-[40px] rounded-xl -z-20 transform scale-x-[-1] rotate-[0deg] -top-10 right-6 opacity-90 hover:stroke-red-700`}
                >
                  <SvgAnimator
                    paths={[{ d: "M18 6L6 18" }, { d: "M6 6L18 18" }]}
                    duration={0.5}
                    direction="back"
                  />
                </svg>
              )
            )}
            {!rotateStart && (
              <svg
                width="210"
                height="53"
                viewBox="0 0 200 100"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute rotate-90 -right-[125px] top-[65px] overflow-visible "
              >
                <g
                  id="svgGroup"
                  strokeLinecap="round"
                  fillRule="evenodd"
                  fontSize="9pt"
                  stroke="#FFFFFF"
                  strokeWidth="1mm"
                  fill="none"
                  className="group-hover:stroke-log-col"
                >
                  <SvgAnimator
                    paths={designSectPaths}
                    duration={0.7}
                    pathDelay={0.3}
                    delay={1}
                  />
                </g>
              </svg>
            )}
          </button>
        )}
      </motion.div>
      <div
        className={`absolute w-full h-full top-0 left-0 overflow-hidden transition-all duration-500 z-20  ${
          rotateEnd ? "px-0 py-2 " : "px-2 py-0"
        }`}
        style={{
          transform: `rotate(${isRotating && rotateStart ? 90 : 0}deg) rotate(${
            isRotating && !rotateStart ? -90 : 0
          }deg)`,
          transition: isRotating ? "transform 0.5s ease" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
