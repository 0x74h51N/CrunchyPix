'use client';
import i18n from '@/i18n/client';
import { DE, TR, GB } from 'country-flag-icons/react/3x2';
import { switchLocaleAction } from '@/i18n/actions/switch-locale';
import Dropdown from '../Buttons/Dropdown';
import { useState } from 'react';

const LanguageMenu = ({ smallNav }: { smallNav: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  const classes = `relative flex justify-center mobile-menu text-md font-medium text-neutral-200 w-[72px] right-[15px] ${isDropdownOpen ? 'open2' : 'close'} ${
    smallNav ? `-mt-2 right-[16px] lg:mt-5 ` : `-mt-2 right-[16px] lg:mt-[50px]`
  }
`;
  const languages = [
    { label: 'EN', value: <GB title="United Kingdom" /> },
    { label: 'DE', value: <DE title="Germany" /> },
    { label: 'TR', value: <TR title="Turkey" /> },
  ];
  return (
    <Dropdown
      hoverMode={false}
      classes={classes}
      defaultValue={defaultValue}
      options={languages}
      optionClickHandler={handleChange}
      isDropdownOpen={isDropdownOpen}
      setDropdownOpen={setIsDropdownOpen}
      style={{ width: 36 }}
      ulClasses="pt-5"
    />
  );
};

export default LanguageMenu;
