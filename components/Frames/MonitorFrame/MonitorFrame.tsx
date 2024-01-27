import Image from "next/image";

interface MonitorFrameProps {
  screenImage?: string;
  children?: React.ReactNode;
}

const MonitorFrame = ({ screenImage, children }: MonitorFrameProps) => {
  return (
    <div className="relative flex flex-wrap 2xl:w-[850px] 2xl:min-h-[650px] xl:w-[800px] xl:min-h-[600px] lg:w-[750px] lg:min-h-[550px]  md:w-[550px] md:min-h-[435px]  w-[350px] min-h-[300px] overflow-hidden">
      <Image
        width={1000}
        height={1000}
        quality={100}
        loading="lazy"
        src="/monitor.png"
        alt="Monitor Frame"
        className="object-fit absolute top-0 left-0 z-20 pointer-events-none"
      />
      <div className="absolute left-0 2xl:w-[850px] 2xl:h-[450px] xl:w-[800px] xl:h-[420px] lg:w-[750px] lg:h-[400px] md:w-[560px] md:h-[290px] w-[360px] h-[180px] 2xl:pl-[80px] 2xl:pt-[40px] xl:pl-[75px] lg:pl-[65px] lg:pt-[35px] md:pl-[50px] md:pt-[30px] pl-[20px] pt-[15px] pr-3 cursor-none">
        {children}
      </div>
    </div>
  );
};

export default MonitorFrame;
