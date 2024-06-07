let cache: { [key: string]: any } = {};

export const getCachedData = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  cacheDuration: number = 1000 * 60 * 60,
): Promise<T> => {
  const now = Date.now();
  if (cache[key] && cache[key].expiry > now) {
    return cache[key].data;
  }

  const data = await fetcher();
  cache[key] = {
    data,
    expiry: now + cacheDuration,
  };
  return data;
};
