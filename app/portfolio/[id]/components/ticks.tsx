import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuCheckCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const Ticks = ({ ticks }: { ticks: string[] }) => {
  const tickCount = ticks.length;
  const half = Math.ceil(tickCount / 2);
  const firstColumn = ticks.slice(0, half);
  const secondColumn = ticks.slice(half);
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
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
  const TickIcon = <LuCheckCircle size={20} className="text-log-col mr-2" />;
  return (
    <div className="flex">
      <div className="w-1/2">
        <ul>
          {firstColumn.map((tick, index) => (
            <li
              key={index}
              className="flex items-center text-cool-gray-200 mt-3 hover:scale-105 hover:pl-3 transition-all duration-500 ease-in-out"
            >
              {TickIcon} {t(tick)}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2">
        <ul>
          {secondColumn.map((tick, index) => (
            <li
              key={index}
              className="flex items-center text-cool-gray-200 mt-3 hover:scale-105 hover:pl-3 transition-all duration-500 ease-in-out"
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
