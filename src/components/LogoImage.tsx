import { LogoComponent } from '@/utils/logoComponent';
import clsx from 'clsx';
import { CldImage } from 'next-cloudinary';

interface LogoImageProps {
  logoKey: string;
  index: number;
  tooltip?: boolean;
  blur?: boolean;
}

const LogoImage = ({
  logoKey,
  index,
  tooltip = true,
  blur = false,
}: LogoImageProps) => {
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
        className={clsx(
          'object-contain h-auto w-full',
          blur &&
            'md:blur-[2px] sm:blur-[1.5px] blur-[1px] md:transition md:ease-in-out md:duration-300 hover:blur-none',
          item.text === 'Next.js' && 'bg-blue-400 rounded-full',
        )}
      />
    </div>
  );
};

export default LogoImage;
