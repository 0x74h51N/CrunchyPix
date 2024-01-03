import { logoSlide } from "@/constants/logoSlide";
import LogoSlide from "../../Slider/LogoSlide";

const LogoSect = () => {
  return (
    <div className="w-full h-auto flex flex-row justify-center items-center bg-cool-gray-800">
      <LogoSlide logos={logoSlide} />
    </div>
  );
};

export default LogoSect;
