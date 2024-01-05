import { ProjectInfo } from "@/app/common.types";
import Labels from "@/components/Labels";
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
      <div className="relative flex h-[580px] w-[400px] rounded-3xl bg-log-col">
        <Image
          src="/projectInfo.png"
          alt="project info background"
          width={800}
          height={800}
          quality={100}
          loading="lazy"
          className="z-0 h-full object-cover rounded-3xl"
        />
        <div className="absolute flex flex-col gap-6 w-full h-full justify-center p-16 ">
          <div>
            <h3 className="p cool">Category</h3>
            <h4 className="h3 cool">{t(ProjectInfo.category)}</h4>
          </div>
          <div>
            <h3 className="p cool">Client</h3>
            <h4 className="h3 cool">{t(ProjectInfo.client)}</h4>
          </div>
          <div>
            <h3 className="p cool">Location</h3>
            <h4 className="h3 cool">{t(ProjectInfo.location)}</h4>
          </div>
          <div>
            <h3 className="p cool">Publish Date</h3>
            <h4 className="h3 cool">{t(ProjectInfo.date)}</h4>
          </div>
          <div>
            <h3 className="p cool">Tech</h3>
            <h4>
              {" "}
              {ProjectInfo.tech.map((tech: string, index: number) => (
                <Labels key={index} text={tech} />
              ))}
            </h4>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default ProjectInfo;
