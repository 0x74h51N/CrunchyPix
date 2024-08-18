import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PortfolioItemProps } from '@/schemas';
import Dropdown from '@/components/Buttons/Dropdown';
import { Option } from '@/types/common.types';

type FilterItemsProps = {
  portfolioPageItems: PortfolioItemProps[];
  setFilteredItems: Dispatch<SetStateAction<PortfolioItemProps[]>>;
};

const FilterItems = ({
  portfolioPageItems,
  setFilteredItems,
}: FilterItemsProps) => {
  const { t } = useTranslation('portfolio');
  const [sortedItems, setSortedItems] = useState<PortfolioItemProps[]>([]);
  const [searchParam, setSearchParam] = useState('');
  const [selectedOption, setSortOption] = useState('');
  useEffect(() => {
    setSearchParam('');
    setSortOption('');
  }, [t]);
  useEffect(() => {
    const filteredItems = portfolioPageItems.filter(
      (item: PortfolioItemProps) => {
        const title = item.project_overview?.[0]?.title?.toLowerCase() ?? '';
        const type =
          item.project_overview?.[0]?.project_type?.toLowerCase() ?? '';
        return (
          title.includes(searchParam) ||
          type.includes(searchParam) ||
          item._id.toLowerCase().includes(searchParam)
        );
      },
    );
    setSortedItems(filteredItems);
  }, [searchParam, portfolioPageItems]);

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems, setFilteredItems]);

  useEffect(() => {
    const handleSortChange = (sortOption: string) => {
      setSortOption(sortOption);
      if (sortOption.includes('new')) {
        const dateSorted = [...sortedItems].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (!dateA || !dateB) {
            return 0;
          }
          return dateB.getTime() - dateA.getTime();
        });
        if (sortOption === 'new_to_old') {
          setSortedItems(dateSorted);
        } else if (sortOption === 'old_to_new') {
          const rev = dateSorted.reverse();
          setSortedItems(rev);
        }
      } else if (sortOption.includes('alphabetically')) {
        const alphaSort = [...sortedItems].sort((a, b) => {
          const aTitle = a.project_overview?.[0]?.title ?? '';
          const bTitle = b.project_overview?.[0]?.title ?? '';
          return aTitle.replace('_', '').localeCompare(bTitle);
        });
        if (sortOption === 'alphabetically_a-z') {
          setSortedItems(alphaSort);
        } else {
          const aplhRev = alphaSort.reverse();
          setSortedItems(aplhRev);
        }
      }
    };
    handleSortChange(selectedOption);
  }, [selectedOption]);

  const optionsObj = t('sort.options', { returnObjects: true }) as {
    [key: string]: string;
  };
  const options = Object.entries(optionsObj).map(([key, value]) => ({
    key: key,
    value: value,
  })) as Option[];

  return (
    <div className="flex flex-row xl:justify-end xl:px-0 justify-between gap-6 w-full z-30">
      <div className="relative w-40 z-20 pr-4 transform brightness-100 hover:brightness-150 transition-brightness ease-in-out duration-500">
        <Dropdown
          hoverMode={false}
          classes={
            '-z-10 absolute top-0 left-0 p items-end transition-height ease-in-out duration-500 w-full '
          }
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
