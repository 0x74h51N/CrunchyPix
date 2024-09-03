import { LogoComponent } from '@/utils/logoComponent';
import { CldImage } from 'next-cloudinary';

interface LogoImageProps {
  logoKey: string;
  index: number;
  tooltip?: boolean;
}

const LogoImage = ({ logoKey, index, tooltip = true }: LogoImageProps) => {
  const item = LogoComponent({ key: logoKey });

  return (
    <div
      key={item.icon + ' key ' + index}
      data-tip={item.text}
      className={`${tooltip ? 'tooltip tooltip-top tooltip-crunchy' : ''} flex w-full`}
    >
      <CldImage
        fill
        sizes="auto"
        src={item.icon}
        alt={item.text}
        quality={100}
        priority
        format="svg"
        className={`object-contain h-auto w-full ${
          item.text == 'Next.js' && ' bg-blue-400 rounded-full'
        }`}
      />
    </div>
  );
};

export default LogoImage;
