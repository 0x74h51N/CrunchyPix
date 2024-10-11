interface ArrowSVG {
  width: number;
  height: number;
  strokeWidth: number;
  onClick?: () => void;
}

const ArrowSVG = ({ width, height, strokeWidth, onClick }: ArrowSVG) => {
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
    >
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
};

export default ArrowSVG;
