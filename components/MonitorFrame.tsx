interface MonitorFrameProps {
  screenImage?: string;
  children?: React.ReactNode;
}

const MonitorFrame = ({ screenImage, children }: MonitorFrameProps) => {
  return (
    <div className="relative w-[900px] h-auto min-h-[700px] overflow-hidden">
      <img
        src="/monitor2.png"
        alt="Monitor Frame"
        className="w-[900px] h-auto absolute top-0 left-0 z-10 pointer-events-none"
      />
      <div className="w-[900px] h-[450px] absolute top-0 left-0 pl-[130px] pt-[50px] pr-5">
        {children}
      </div>
    </div>
  );
};

export default MonitorFrame;
