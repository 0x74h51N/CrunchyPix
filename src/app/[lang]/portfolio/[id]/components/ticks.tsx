import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';

const Ticks = ({ ticks }: { ticks: string[] }) => {
  const tickCount = ticks.length;
  const half = Math.ceil(tickCount / 2);
  const firstColumn = ticks.slice(0, half);
  const secondColumn = ticks.slice(half);
  const { t } = useTranslation('portfolio');

  const TickIcon = <FiCheckCircle className="text-log-col text-lg" />;
  return (
    <div className="flex lg:flex-row flex-col sm:w-full w-auto">
      <div className="lg:w-1/2 w-full">
        <ul>
          {firstColumn.map((tick, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-3 p mt-3 hover:scale-105 hover:pl-3 max-md:pb-3 transition-all duration-500 ease-in-out"
            >
              {TickIcon} {t(tick)}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-1/2 w-full">
        <ul>
          {secondColumn.map((tick, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-3 p mt-3 hover:scale-105 hover:pl-3 max-md:pb-3 transition-all duration-500 ease-in-out"
            >
              {TickIcon} {t(tick)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(Ticks);
