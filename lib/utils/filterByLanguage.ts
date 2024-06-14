type FilterByLanguageProps<T> = {
  items: T[];
  language: string;
  localPath: keyof T | '';
};

const filterByLanguage = <T extends { [key: string]: any }>({
  items,
  language,
  localPath,
}: FilterByLanguageProps<T>): T[] => {
  return items
    .map((item) => {
      if (localPath !== '') {
        const filtered = item[localPath].find(
          (innerItem: { lang: string }) => innerItem.lang === language,
        );
        if (filtered) {
          return { ...item, [localPath]: [filtered] };
        }
        return null;
      } else {
        if (item.lang === language) {
          return item;
        }
        return null;
      }
    })
    .filter((item) => item !== null) as T[];
};

export default filterByLanguage;
