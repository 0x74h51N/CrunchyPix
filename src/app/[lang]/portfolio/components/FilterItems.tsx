import Dropdown from '@/components/Buttons/Dropdown';
import { PortfolioItemProps } from '@/lib/schemas';
import { Option } from '@/lib/types/common.types';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortAlphabetically, sortByDate } from './utils';
import { Locales } from '@/i18n/settings';

type FilterItemsProps = {
  portfolioPageItems: PortfolioItemProps[];
  setFilteredItems: Dispatch<SetStateAction<PortfolioItemProps[]>>;
  lang: Locales;
};

const FilterItems = ({
  portfolioPageItems,
  setFilteredItems,
  lang,
}: FilterItemsProps) => {
  const { t } = useTranslation('portfolio');
  const [searchParam, setSearchParam] = useState('');
  const [selectedOption, setSortOption] = useState('');
  useEffect(() => {
    setSearchParam('');
    setSortOption('');
  }, [lang]);

  const filteredAndSortedItems = useMemo(() => {
    const filteredItems = portfolioPageItems.filter((item) => {
      const title = item.project_overview?.[0]?.title?.toLowerCase() ?? '';
      const type =
        item.project_overview?.[0]?.project_type?.toLowerCase() ?? '';
      const searchLower = searchParam.toLowerCase();
      return (
        title.includes(searchLower) ||
        type.includes(searchLower) ||
        item._id.toLowerCase().includes(searchLower)
      );
    });

    switch (selectedOption) {
      case 'new_to_old':
        return sortByDate(filteredItems, 'new_to_old');
      case 'old_to_new':
        return sortByDate(filteredItems, 'old_to_new');
      case 'alphabetically_a-z':
        return sortAlphabetically(filteredItems, 'alphabetically_a-z');
      case 'alphabetically_z-a':
        return sortAlphabetically(filteredItems, 'alphabetically_z-a');
      default:
        return filteredItems;
    }
  }, [portfolioPageItems, searchParam, selectedOption]);

  useEffect(() => {
    setFilteredItems(filteredAndSortedItems);
  }, [filteredAndSortedItems, setFilteredItems]);

  const optionsObj = t('sort.options', { returnObjects: true }) as {
    [key: string]: string;
  };
  const options = Object.entries(optionsObj).map(([key, value]) => ({
    key,
    value,
  })) as Option[];

  return (
    <div className="flex flex-row xl:justify-end xl:px-0 justify-between gap-6 w-full z-30">
      <div className="relative w-40 z-20 pr-4 transform brightness-100 hover:brightness-150 transition-brightness ease-in-out duration-500">
        <Dropdown
          hoverMode={false}
          defaultValue={
            selectedOption ? t(`sort.options.${selectedOption}`) : t('sort.def')
          }
          options={options}
          style={{ width: 135 }}
          ulClasses="pt-7"
          flagMode={false}
          selectedOption={selectedOption}
          liClass="px-3 py-1 first:border-t first:border-t-1 border-cool-gray-700"
          setSelectedOption={setSortOption}
          openClass={'h-[180px] py-4'}
          closeClass={'h-full p-0 '}
        />
      </div>
      <input
        id="search"
        type="text"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value.toLowerCase().trim())}
        placeholder={t('search')}
        className="contactBox md:max-w-[16rem] max-w-[10rem] focus:border-log-col focus:shadow-inner"
      />
    </div>
  );
};

export default FilterItems;
