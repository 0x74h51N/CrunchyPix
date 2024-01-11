import Image from "next/image";
import Link from "next/link";
import TypingText from "../typeText";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { clickableChange } from "@/store/redux/isClickable";

const CrunchyLogo = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const smallNav = useSelector(
    (state: RootState) => state.navbarChange.smallNav
  );
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div>
      <Link
        href="/"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-row items-center justify-center pointer-events-auto cursor-none">
          <Image
            src={"/logo_leftw.svg"}
            width={smallNav ? 12.5 : isMobile ? 18.5 : isTablet ? 27.5 : 32.5}
            height={100}
            alt="Crunchypix"
            loading="eager"
            priority
            className={`${
              smallNav ? "" : "navImage"
            } transition-all hover:scale-105 duration-1000 ease-in-out h-full pb-3`}
          />
          {smallNav || screenWidth <= 300 ? null : (
            <div
              className={`flex items-center logo_text lg:mt-0 -mt-1 lg:-ml-2 -ml-1 ${
                smallNav
                  ? "text-[25px]"
                  : isMobile
                  ? "text-[30px]"
                  : isTablet
                  ? "text-[45px]"
                  : "text-[55px]"
              } text-stone-50 hover:scale-105 transition-all duration-1000 ease-in-out`}
            >
              <TypingText text="Crunchy" typingSpeed={70} _code={false} />
              <span className="mt-12 -ml-1">
                <TypingText
                  text="Pix"
                  _code={false}
                  typingSpeed={75}
                  delay={550}
                  textClass={`text-log-col`}
                />
              </span>
            </div>
          )}
          <Image
            src={"logo_right.svg"}
            width={smallNav ? 19.3 : isMobile ? 28 : isTablet ? 40 : 50}
            height={100}
            alt="Crunchypix"
            loading="eager"
            priority
            className={`hover:scale-105 transition-all duration-1000 ease-in-out ${
              smallNav
                ? "mt-2"
                : "navImage delay-200 lg:translate-y-6 translate-y-[22px] -translate-x-2 transition-all duration-1000 ease-in-out"
            }`}
          />
        </div>
      </Link>
    </div>
  );
};

export default CrunchyLogo;
