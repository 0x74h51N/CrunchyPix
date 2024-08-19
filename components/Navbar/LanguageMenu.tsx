'use client';
import i18n from '@/i18n/client';
import { DE, TR, GB } from 'country-flag-icons/react/3x2';
import { switchLocaleAction } from '@/i18n/actions/switch-locale';
import Dropdown from '../Buttons/Dropdown';
import { useEffect, useState } from 'react';

const languages = [
  {
    key: 'EN',
    value: <GB className="!max-w-6" title="United Kingdom" />,
  },
  {
    key: 'DE',
    value: <DE className="!max-w-6" title="Germany" />,
  },
  { key: 'TR', value: <TR className="!max-w-6" title="Turkey" /> },
];

const LanguageMenu = ({ smallNav }: { smallNav: boolean }) => {
  const defLan = i18n.language || 'en';
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defLan);

  useEffect(() => {
    const handleChange = async (selectedLanguage: string) => {
      const result = await switchLocaleAction(selectedLanguage);
      if (result.status === 'success') {
        i18n.changeLanguage(selectedLanguage);
      }
    };
    handleChange(selectedLanguage);
  }, [selectedLanguage]);

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
  const classes = `relative flex justify-center mobile-menu text-md font-medium text-neutral-200 w-[72px] right-[15px] ${
    smallNav ? `-mt-2 right-[16px] lg:mt-5 ` : `-mt-2 right-[16px] lg:mt-[50px]`
  }
`;

  return (
    <Dropdown
      openClass={'open2'}
      closeClass={'close'}
      hoverMode={false}
      classes={classes}
      defaultValue={defaultValue}
      options={languages}
      style={{ width: 36 }}
      ulClasses="pt-5"
      setSelectedOption={setSelectedLanguage}
      flagMode
    />
  );
};

export default LanguageMenu;
