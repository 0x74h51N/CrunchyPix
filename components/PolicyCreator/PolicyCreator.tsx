import { Policy } from "@/app/common.types";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";

const CustomLink = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    target="_blank"
    className="text-log-col underline underline-offset-3 cursor-none"
    {...props}
  >
    {children}
  </a>
);

const PolicyCreator = memo(({ data }: { data: Policy[] }) => {
  const { t, i18n } = useTranslation(["policies"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      {data.map((item, index) => (
        <div key={index}>
          {item.mainTitle && (
            <>
              <h1 className="h1 text-center">{t(item.mainTitle)}</h1>
              <p className="p mt-2">{t(item.description)}</p>
            </>
          )}
          {item.title && (
            <>
              <h2 className="h2">{t(item.title)}</h2>
              <p className="p mt-2 cursor-none">
                <ReactMarkdown components={{ a: CustomLink }}>
                  {t(item.description)}
                </ReactMarkdown>
              </p>
            </>
          )}
          {item.subTitles && (
            <ul>
              {item.subTitles.map((subItem, subIndex) => (
                <li className="ml-6 mt-3 list-disc text-white" key={subIndex}>
                  <h3 className="h3 underline underline-offset-2">
                    {t(subItem.title)}
                  </h3>
                  <p className="p ml-2">{t(subItem.description)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
});

export default PolicyCreator;
