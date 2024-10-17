'use client';
import React, { memo, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import CustomLink from '@/components/CustomLink';
import { PoliciesSchema, PoliciesTypes } from '@/lib/schemas';
import i18next, { getLocale } from '@/i18n/client';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '@/components/Loading/Loading';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';

const PolicyCreator = ({ id }: { id: string }) => {
  const { t } = useTranslation('policies');
  const filters = useMemo(() => [{ column: 'policy_name', value: id }], [id]);
  const { data, loading, error } = useSupabaseFetch<PoliciesTypes>(
    'policy_schema',
    'policies',
    `*, translations(*, sub_sections(*, sub_titles(*)))`,
    PoliciesSchema,
    filters,
  );

  const [filteredData, setFilteredData] = useState<PoliciesTypes[]>([]);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const locale = await getLocale();
      setLanguage(locale || i18next.language);
    };

    fetchLanguage();
  }, []);

  useEffect(() => {
    if (data && language) {
      const filteredDat = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });

      const sortedData = filteredDat.map((policy) => {
        const sortedTranslations = policy.translations!.map((translation) => {
          const sortedSubSections = translation.sub_sections
            ? [...translation.sub_sections]
                .sort((a, b) => a.id - b.id)
                .map((subSection) => ({
                  ...subSection,
                  sub_titles: subSection.sub_titles
                    ? [...subSection.sub_titles].sort((a, b) => a.id - b.id)
                    : [],
                }))
            : [];
          return {
            ...translation,
            sub_sections: sortedSubSections,
          };
        });
        return {
          ...policy,
          translations: sortedTranslations,
        };
      });

      setFilteredData(sortedData);
    }
  }, [data, language]);

  useEffect(() => {
    document.title = t('meta.title');
  }, [t, language]);

  if (error) {
    console.error(error);
  }

  const policyData = filteredData[0]?.translations?.[0];
  const subSections = policyData?.sub_sections || [];

  if (loading || !policyData) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col gap-10">
      {policyData.intro && (
        <h2 className="h3 text-center">{policyData.intro}</h2>
      )}
      {policyData.title && (
        <h1 className="h1 text-center -mt-8">{policyData.title}</h1>
      )}
      {subSections.map((item, index) => (
        <div key={index}>
          {item.title && <h2 className="h2">{item.title}</h2>}
          <div className="p mt-2 cursor-none">
            <ReactMarkdown
              components={{
                a: ({
                  children,
                  ...props
                }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                  <CustomLink href={props.href as string}>
                    {children as JSX.Element}
                  </CustomLink>
                ),
              }}
              remarkPlugins={[breaks]}
            >
              {item.description && item.description.replace(/\\n/g, '\n')}
            </ReactMarkdown>
          </div>
          {item.sub_titles && (
            <ul>
              {item.sub_titles.map((subItem, subIndex) => (
                <li className="ml-10 mt-3 list-disc text-white" key={subIndex}>
                  <h3 className="h3 underline underline-offset-2">
                    {subItem.title}
                  </h3>
                  <p className="p ml-2">{subItem.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(PolicyCreator);
