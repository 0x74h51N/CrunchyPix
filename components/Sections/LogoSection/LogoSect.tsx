import { logoSlide } from "@/constants/logoSlide";
import LogoSlide from "../../Slider/LogoSlide";

const LogoSect = () => {
  return (
    <div className="w-full h-auto flex flex-row justify-center items-center">
      <LogoSlide logos={logoSlide} />
    </div>
  );
};

export default LogoSect;
