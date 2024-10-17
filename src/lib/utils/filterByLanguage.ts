type FilterByLanguageProps<T> = {
  items: T[];
  language: string;
  localPath: keyof T | '';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterByLanguage = <T extends { [key: string]: any }>({
  items,
  language,
  localPath,
}: FilterByLanguageProps<T>): T[] => {
  return items
    .map((item) => {
      if (localPath !== '' || Array.isArray(item[localPath])) {
        const filtered =
          item[localPath] &&
          item[localPath].find(
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
