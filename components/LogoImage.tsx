import { LogoComponent } from '@/utils/logoComponent';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

interface LogoImageProps {
  logoKey: string;
  index: number;
}

const LogoImage = ({ logoKey, index }: LogoImageProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const item = LogoComponent({ key: logoKey });
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <>
      <CldImage
        fill
        src={item.icon}
        alt={item.text}
        quality={100}
        format="svg"
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className={`object-contain h-auto w-full ${
          item.text == 'Next.js' &&
          ' bg-blue-500 rounded-full border-blue-500 border-2'
        }`}
      />
      {hoveredIndex === index && (
        <div className="fixed self-center -bottom-7 rounded-md border-spacing-1 border-cool-gray-700 border-2 w-auto p-1 text-center text-white text-xs bg-cool-gray-400 opacity-80 transition-opacity duration-300 cursor-none pointer-events-none">
          {item.text}
        </div>
      )}
    </>
  );
};

export default LogoImage;
