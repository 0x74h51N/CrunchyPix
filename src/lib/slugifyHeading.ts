export const slugifyHeading = ({ text }: { text: string }) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/(^-|-$)/g, '');
};
