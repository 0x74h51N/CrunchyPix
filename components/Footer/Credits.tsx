import IconButton from '../Buttons/IconButton';
import { IconProps } from '@/schemas';
import { RiCopyleftLine } from 'react-icons/ri';

const Credits = ({ data }: { data: IconProps[] }) => {
  return (
    <div className="flex justify-center sm:px-16 px-2 w-full">
      <div className=" flex flex-row justify-between items-center footer_copyright w-full max-w-[1300px]">
        <p className="flex items-center">
          <span>@ 2024 ·</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.gnu.org/licenses/copyleft"
            className="hover:text-log-col mx-1"
          >
            <RiCopyleftLine />
          </a>
          <span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/0x74h51N/CrunchyPix/blob/master/LICENSE.md"
              className="hover:text-log-col"
            >
              Copyleft
            </a>{' '}
            · Tahsin Önemli · 0x74h51N
          </span>
        </p>
        <div className="flex flex-row gap-3  items-center justify-center h-auto">
          {data.map((icon: IconProps, index: number) => (
            <span
              key={index}
              className="hover:text-log-col hover:-translate-y-2 transition-all ease-in-out duration-500 py-2"
            >
              <IconButton key={index} icon={icon} size={25} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;
