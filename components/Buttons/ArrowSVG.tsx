import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { useDispatch, useSelector } from "react-redux";

interface ArrowSVG {
  width: number;
  height: number;
  strokeWidth: number;
  onClick: () => void;
}

const ArrowSVG = ({ width, height, strokeWidth, onClick }: ArrowSVG) => {
  const dispatch = useDispatch();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const handleMouseEnter = () => {
    if (isClickable === false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable === true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={"none"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
};

export default ArrowSVG;
