'use client';
import { RootState } from '@/store';
import i18n from '@/i18n/client';
import { useSelector } from 'react-redux';
import { DE, TR, GB } from 'country-flag-icons/react/3x2';
import { switchLocaleAction } from '@/i18n/actions/switch-locale';
import Dropdown from '../Dropdown';
import { useState } from 'react';

const LanguageMenu = ({ smallNav }: { smallNav: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);

  const handleChange = async (selectedLanguage: string) => {
    const result = await switchLocaleAction(selectedLanguage);
    if (result.status === 'success') {
      i18n.changeLanguage(selectedLanguage);
    }
    setIsDropdownOpen(false);
  };

  const getFlagComponent = (language: string) => {
    switch (language) {
      case 'en':
        return <GB title="United Kingdom" />;
      case 'de':
        return <DE title="Germany" />;
      case 'tr':
        return <TR title="Turkey" />;
    }
  };
  const defaultValue = getFlagComponent(i18n.language);
  const classes = `relative mobile-menu text-md font-medium text-neutral-200 w-[72px] right-[15px] ${isDropdownOpen ? 'open2' : 'close'} ${
    smallNav
      ? `${isMobile || isTablet ? '-mt-2 right-[16px]' : 'mt-5'} flex justify-center`
      : isMobile || isTablet
        ? `-mt-2 flex justify-center right-[16px]`
        : 'mt-[70px]'
  }
`;
  const languages = [
    { label: 'EN', value: <GB title="United Kingdom" /> },
    { label: 'DE', value: <DE title="Germany" /> },
    { label: 'TR', value: <TR title="Turkey" /> },
  ];
  return (
    <Dropdown
      classes={classes}
      defaultValue={defaultValue}
      options={languages}
      optionClickHandler={handleChange}
      isDropdownOpen={isDropdownOpen}
      setDropdownOpen={setIsDropdownOpen}
      width={36}
      ulClasses="pt-5"
    />
  );
};

export default LanguageMenu;
