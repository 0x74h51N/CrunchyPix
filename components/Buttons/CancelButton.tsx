import { useDispatch, useSelector } from "react-redux";
import SvgAnimator from "../SvgAnimator";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";

const CancelButton = () => {
  const dispatch = useDispatch();
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`absolute w-[40px] h-[40px] rounded-xl -z-20 transform scale-x-[-1] rotate-[0deg] -top-10 right-6 opacity-90 hover:stroke-red-700`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SvgAnimator
        paths={[{ d: "M18 6L6 18" }, { d: "M6 6L18 18" }]}
        duration={0.5}
        direction="back"
      />
    </svg>
  );
};

export default CancelButton;
