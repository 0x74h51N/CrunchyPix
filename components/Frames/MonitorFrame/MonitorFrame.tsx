import { CldImage } from 'next-cloudinary';

interface MonitorFrameProps {
  children?: React.ReactNode;
}

const MonitorFrame = ({ children }: MonitorFrameProps) => {
  return (
    <div className="relative flex flex-wrap 2xl:w-[850px] 2xl:min-h-[640px] xl:w-[800px] xl:min-h-[600px] lg:w-[750px] lg:min-h-[550px]  md:w-[550px] md:min-h-[435px]  w-[350px] min-h-[300px] overflow-hidden hover:scale-[1.15] transition-all duration-[2500ms] in-expo mt-10">
      <CldImage
        width={1600}
        height={1600}
        quality={100}
        loading="lazy"
        src="crunchypix/monitor.png"
        alt="Monitor Frame"
        className="object-fit absolute top-0 left-0 z-20 pointer-events-none "
      />
      <div className="absolute left-0 2xl:w-[850px] 2xl:h-[450px] xl:w-[800px] xl:h-[420px] lg:w-[750px] lg:h-[400px] md:w-[560px] md:h-[290px] w-[360px] h-[180px] 2xl:pl-[100px] 2xl:pt-[40px] xl:pl-[95px] lg:pl-[70px] lg:pt-[35px] md:pl-[55px] md:pt-[30px] pl-[35px] pt-[15px] pr-3 cursor-none">
        {children}
      </div>
    </div>
  );
};

export default MonitorFrame;
