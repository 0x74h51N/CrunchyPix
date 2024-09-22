import Image from 'next/image';
import { memo } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}
const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="relative delay-500 w-[200px] h-[400px] md:w-[300px] md:h-[600px]">
      <div
        className={`absolute w-full h-full top-0 left-0 flex flex-1 items-center justify-center pointer-events-none cursor-none `}
      >
        <Image
          width={295}
          height={600}
          quality={100}
          src="/phone.svg"
          alt="Phone Frame"
          style={{
            zIndex: 150,
          }}
        />
      </div>
      <div
        className={`absolute w-full h-full top-0 left-0 overflow-hidden transition-all duration-500 z-20 cursor-none px-2 py-0'`}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(PhoneFrame);
