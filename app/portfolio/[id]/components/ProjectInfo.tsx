import { ProjectInfo } from "@/app/common.types";
import LogoImage from "@/components/LogoImage";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ProjectInfo = ({ ProjectInfo }: { ProjectInfo: ProjectInfo }) => {
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
  if (ProjectInfo)
    return (
      <div className="relative flex lg:h-[600px] md:w-[420px] sm:w-[330px] md:h-[550px] sm:h-[450px] h-[440px] w-[300px] rounded-3xl bg-log-col md:ml-6 ml-0">
        <Image
          src="/projectInfo.png"
          alt="project info background"
          width={1200}
          height={1200}
          quality={100}
          loading="lazy"
          className="z-0 h-full object-cover rounded-3xl"
        />
        <div className="absolute flex flex-col gap-6 w-full h-full justify-start lg:p-[4.2rem] md:p-12 p-10">
          <div>
            <h4 className="h4 cool">{t("portfolioItemComp.category")}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.category)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t("portfolioItemComp.client")}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.client)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t("portfolioItemComp.location")}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.location)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t("portfolioItemComp.date")}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.date)}</h3>
          </div>
          <div>
            <h3 className="p cool">{t("portfolioItemComp.tech")}</h3>
            <div className="absolute left-0 md:bottom-16 sm:bottom-6 bottom-8 flex flex-row justify-between p-2 lg:px-[4.2rem] md:px-12 px-10 bg-slate-300 bg-opacity-50 w-full ">
              {ProjectInfo.tech.map((tech: string, index: number) => (
                <div
                  key={index}
                  className="relative md:w-10 md:h-10 w-7 h-7 grayscale"
                >
                  <LogoImage logoKey={tech} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default ProjectInfo;
