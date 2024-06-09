type FilterByLanguageProps<T> = {
  items: T[];
  language: string;
  localPath: keyof T;
};

const filterByLanguage = <T extends { [key: string]: any }>({
  items,
  language,
  localPath,
}: FilterByLanguageProps<T>): T[] => {
  return items
    .map((item) => {
      const filtered = item[localPath].find(
        (item: { lang: string }) => item.lang === language,
      );
      if (filtered) {
        return { ...item, [localPath]: [filtered] };
      }
      return null;
    })
    .filter((item) => item !== null) as T[];
};

export default filterByLanguage;
