'use client';
import { switchLocaleAction } from '@/app/actions/switch-locale';
import i18n from '@/i18n/client';
import { Locales } from '@/i18n/settings';
import { RootState } from '@/store';
import clsx from 'clsx';
import { GB, TR } from 'country-flag-icons/react/3x2';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from '../Buttons/Dropdown';

const languages: { key: Locales; value: React.ReactNode }[] = [
  { key: 'en', value: <GB className="!max-w-6" title="United Kingdom" /> },
  { key: 'tr', value: <TR className="!max-w-6" title="Turkey" /> },
];

const LanguageMenu = ({ smallNav }: { smallNav: boolean }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const router = useRouter();
  const currentPathname = usePathname();
  const pathSegments = currentPathname.split('/');
  const languageFromPath = pathSegments[1] as Locales;
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  useEffect(() => {
    const handleChange = async (lang: Locales) => {
      const result = await switchLocaleAction(lang);
      if (result.status === 'success') {
        const newPath = currentPathname.replace(
          `/${languageFromPath}`,
          `/${lang}`,
        );
        router.replace(newPath);
        i18n.changeLanguage(lang);
      }
    };

    if (selectedLanguage) {
      handleChange(selectedLanguage as Locales);
    }
  }, [selectedLanguage, currentPathname, router, languageFromPath]);

  const defaultValue =
    languages.find((lang) => lang.key === languageFromPath) || languages[0];

  const classes = clsx(
    'relative flex justify-center mobile-menu text-md font-medium w-[72px] right-[25px]',
    smallNav ? '-mt-2 right-[16px] lg:mt-5' : '-mt-2 right-[16px] lg:mt-[50px]',
  );

  return (
    <Dropdown
      openClass={'open2'}
      closeClass={'close'}
      hoverMode={false}
      classes={classes}
      defaultValue={defaultValue.value}
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
