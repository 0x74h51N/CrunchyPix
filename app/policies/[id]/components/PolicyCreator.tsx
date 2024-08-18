'use client';
import React, { memo, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import CustomLink from '@/components/CustomLink';
import { PoliciesSchema, PoliciesTypes } from '@/schemas';
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
  const language = getLocale() || i18next.language;

  useEffect(() => {
    if (data) {
      const filteredDat = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });
      setFilteredData(filteredDat);
    }
  }, [data, language, setFilteredData]);
  console.log(filteredData);
  useEffect(() => {
    document.title = t('meta.title');
  }, [t, language]);
  if (error) {
    console.log(error);
  }
  return loading ||
    !filteredData[0] ||
    !filteredData[0].translations ||
    !filteredData[0].translations[0].sub_sections ? (
    <LoadingComponent />
  ) : (
    <div className="flex flex-col gap-10">
      {filteredData[0].translations[0].intro && (
        <h2 className="h3 text-center">
          {filteredData[0].translations[0].intro}
        </h2>
      )}
      {filteredData[0].translations[0].title && (
        <h1 className="h1 text-center -mt-8">
          {filteredData[0].translations[0].title}
        </h1>
      )}
      {filteredData[0].translations[0].sub_sections.map((item, index) => (
        <div key={index}>
          {item.title && <h2 className="h2">{item.title}</h2>}
          <div className="p mt-2 cursor-none">
            <ReactMarkdown
              components={{ a: CustomLink }}
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
