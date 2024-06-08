import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Dropdown';
import { PortfolioItemProps } from '@/schemas';
import i18next from 'i18next';

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSortOption] = useState('');
  useEffect(() => {
    setSearchParam('');
    setSortOption('');
  }, [i18next.language]);
  useEffect(() => {
    const filteredItems = portfolioPageItems.filter(
      (item: PortfolioItemProps) => {
        const title = item.project_overview[0].title.toLowerCase();
        const type = item.project_overview[0].project_type.toLowerCase();
        return (
          title.includes(searchParam) ||
          type.includes(searchParam) ||
          item._id.toLowerCase().includes(searchParam)
        );
      },
    );
    setSortedItems(filteredItems);
  }, [searchParam]);

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems]);

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
    setDropdownOpen(false);
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
        const aTitle = a.project_overview[0].title;
        const bTitle = b.project_overview[0].title;
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
  type option = {
    label: string;
    value: string | React.ReactNode;
  };

  const optionsObj = t('sort.options', { returnObjects: true }) as {
    [key: string]: string;
  };
  const options = Object.entries(optionsObj).map(([key, value]) => ({
    label: key,
    value: value,
  })) as option[];
  const classes = `${isDropdownOpen ? 'h-[170px] py-3 ' : ' h-full p-0 '} -z-10 absolute top-0 left-0 p items-end transition-all ease-in-out duration-500 w-40`;
  return (
    <div className="flex flex-row md:justify-end justify-between gap-6 w-full z-30">
      <div className="relative z-20">
        <Dropdown
          classes={classes}
          defaultValue={
            selectedOption ? t(`sort.options.${selectedOption}`) : t('sort.def')
          }
          options={options}
          optionClickHandler={handleSortChange}
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          style={{ width: 135 }}
          ulClasses="pt-7 transition-all ease-in-out duration-500"
          flagMode={false}
          selectedOption={selectedOption}
          liClass="px-3 py-1"
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
