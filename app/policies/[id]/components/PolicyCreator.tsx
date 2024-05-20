import { Policy } from "@/app/common.types";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import React, { memo, useEffect } from "react";
import { useTranslation } from "@/i18n/client";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import CustomLink from "@/components/CustomLink";

const PolicyCreator = memo(({ data }: { data: Policy[] }) => {
  const { t, i18n } = useTranslation("policies");
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
              <h1 className="h1 text-center">
                <ReactMarkdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {t(item.mainTitle)}
                </ReactMarkdown>
              </h1>
              {item.description && (
                <p className="p mt-2">{t(item.description)}</p>
              )}
            </>
          )}
          {item.title && (
            <>
              <h2 className="h2">{t(item.title)}</h2>
              <div className="p mt-2 cursor-none">
                <ReactMarkdown
                  components={{ a: CustomLink }}
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.description && t(item.description)}
                </ReactMarkdown>
              </div>
            </>
          )}
          {item.subTitles && (
            <ul>
              {item.subTitles.map((subItem, subIndex) => (
                <li className="ml-6 mt-3 list-disc text-white" key={subIndex}>
                  <h3 className="h3 underline underline-offset-2">
                    {subItem.title && t(subItem.title)}
                  </h3>
                  {subItem.description && (
                    <p className="p ml-2">{t(subItem.description)}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
});
PolicyCreator.displayName = "PolicyCreator";
export default PolicyCreator;
