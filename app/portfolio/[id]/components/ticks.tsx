import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n, { useTranslation } from "@/i18n/client";
import { useEffect } from "react";
import { LuCheckCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const Ticks = ({ ticks }: { ticks: string[] }) => {
  const tickCount = ticks.length;
  const half = Math.ceil(tickCount / 2);
  const firstColumn = ticks.slice(0, half);
  const secondColumn = ticks.slice(half);
  const dispatch = useDispatch();
  const { t } = useTranslation("portfolio");
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    const handleInitialized = () => {
      dispatch(setIsTranslationsLoaded(true));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [dispatch]);

  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const TickIcon = <LuCheckCircle className="text-log-col text-lg" />;
  return (
    <div className="flex lg:flex-row flex-col sm:w-full w-auto">
      <div className="lg:w-1/2 w-full">
        <ul>
          {firstColumn.map((tick, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-3 p mt-3 hover:scale-105 hover:pl-3 transition-all duration-500 ease-in-out"
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
              className="flex flex-row items-center gap-3 p mt-3 hover:scale-105 hover:pl-3 transition-all duration-500 ease-in-out"
            >
              {TickIcon} {t(tick)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Ticks;
