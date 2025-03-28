import { PortfolioItemProps } from '@/lib/schemas';

export const sortByDate = (
  items: PortfolioItemProps[],
  order: 'new_to_old' | 'old_to_new',
) => {
  const sorted = [...items].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    const timeA = a.timestamp || new Date(a.date).getTime();
    const timeB = b.timestamp || new Date(b.date).getTime();
    if (isNaN(timeA) || isNaN(timeB)) return 0;
    return timeA - timeB;
  });
  return order === 'new_to_old' ? sorted.reverse() : sorted;
};

export const sortAlphabetically = (
  items: PortfolioItemProps[],
  order: 'alphabetically_a-z' | 'alphabetically_z-a',
) => {
  const sorted = [...items].sort((a, b) => {
    const aTitle = a.project_overview?.[0]?.title?.replace('_', '') ?? '';
    const bTitle = b.project_overview?.[0]?.title?.replace('_', '') ?? '';
    return aTitle.localeCompare(bTitle);
  });
  return order === 'alphabetically_z-a' ? sorted.reverse() : sorted;
};
