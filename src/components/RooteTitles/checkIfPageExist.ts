export const checkIfPageExists = (
  mainPage: string,
  subPage?: string,
  staticParams?: { id: string }[],
): boolean => {
  const mainPages = ['policies', 'portfolio', 'about', 'blog'];

  if (!mainPages.includes(mainPage)) {
    return false;
  }

  if (subPage && subPage !== '') {
    const subPageRes = staticParams!.some((a) => a.id === subPage);
    return subPageRes;
  }

  return true;
};
