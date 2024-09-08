'use client';
import i18n from '@/i18n/client';
import { DE, TR, GB } from 'country-flag-icons/react/3x2';
import { switchLocaleAction } from '@/app/actions/switch-locale';
import Dropdown from '../Buttons/Dropdown';
import { useEffect, useState } from 'react';
import { Locales } from '@/i18n/settings';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

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
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const router = useRouter();
  const currentPathname = usePathname();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  useEffect(() => {
    const handleChange = async (selectedLanguage: Locales) => {
      const result = await switchLocaleAction(selectedLanguage);
      if (result.status === 'success') {
        const newPath = currentPathname.replace(
          `/${i18n.language}`,
          `/${selectedLanguage}`,
        );
        router.replace(newPath);

        i18n.changeLanguage(selectedLanguage);
      }
    };
    if (selectedLanguage) {
      handleChange(selectedLanguage as Locales);
    }
  }, [selectedLanguage, currentPathname]);

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
      liClass={isBlog ? '!cursor-pointer' : '!cursor-none'}
      setSelectedOption={setSelectedLanguage}
      flagMode
    />
  );
};

export default LanguageMenu;
