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
            className={`${
              smallNav ? "" : "navImage"
            } transition-all duration-1000 ease-in-out h-full pb-3`}
          />
          {smallNav || screenWidth <= 300 ? null : (
            <div
              className={`logo_text ${
                smallNav
                  ? "text-[25px]"
                  : isMobile
                  ? "text-[30px]"
                  : isTablet
                  ? "text-[45px]"
                  : "text-[60px]"
              } text-stone-50 transition-all duration-1000 ease-in-out`}
            >
              <TypingText text="Crunchy" _code={false} textClass={``} />
              <TypingText
                text="Pix"
                _code={false}
                delay={460}
                textClass={`text-log-col`}
              />
            </div>
          )}
          <div>
            <Image
              src={"logo_right.svg"}
              width={smallNav ? 19.3 : isMobile ? 28 : isTablet ? 40 : 50}
              height={100}
              alt="Crunchypix"
              loading="eager"
              className={`${
                smallNav ? "" : "navImage"
              } transition-all duration-1000 ease-in-out`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CrunchyLogo;
