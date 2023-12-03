import { RootState } from "@/store";
import { rotateChange, setRotate } from "@/store/redux/mobileRotate";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleClick = () => {
    if (rotateStart) {
      dispatch(setRotate(false));
    } else if (!rotateStart) {
      dispatch(setRotate(true));
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
        rotateStart ? ` w-[600px] h-[300px]` : `w-[300px] h-[600px]`
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
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 23"
          fill="none"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`absolute -right-28 -top-14 w-[170px] h-[150px] rounded-xl -z-20 path-animation ${
            rotateStart
              ? "transform scale-x-[-1] rotate-[130deg] -top-24 -right-[70px]"
              : "-rotate-[30deg]"
          }   ${
            isRotating
              ? "opacity-0 "
              : "opacity-100 transition-all duration-100 delay-1000"
          }    z-20`}
        >
          <path d="M 0 0 C 7 0 14 4 14 12 L 16 9 L 14 12 L 12 10" />
        </svg>
      </button>
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
