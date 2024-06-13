'use client';
import PolicyCreator from '@/app/policies/[id]/components/PolicyCreator';
import LoadingComponent from '@/components/Loading/Loading';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { getLocale } from '@/i18n/client';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { PoliciesSchema, PoliciesTypes } from '@/schemas';
import { useEffect, useState } from 'react';

const PolicyPage = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useSupabaseFetch<PoliciesTypes>(
    'policy_schema',
    'policies',
    `*, translations(*, policy_sections(*, sub_titles(*)))`,
    PoliciesSchema,
    [{ column: 'policy_name', value: params.id }],
  );
  const [filteredData, setFilteredData] = useState<PoliciesTypes[]>([]);
  const language = getLocale();
  useEffect(() => {
    if (data) {
      const filteredDat = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });
      setFilteredData(filteredDat);
    }
  }, [data, language, setFilteredData, loading]);
  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div className=" flex justify-center items-center w-full h-auto  md:pb-20 pb-5 min-h-[100svh]">
      <div className="relative bg-cool-gray-900  md:px-28 md:py-16 p-5 rounded-xl max-w-[1100px] z-0 min-h-48">
        {loading || !data ? (
          <LoadingComponent />
        ) : (
          <PolicyCreator data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default PolicyPage;
