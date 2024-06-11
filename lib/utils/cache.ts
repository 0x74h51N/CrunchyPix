let cache: { [key: string]: any } = {};

export const getCachedData = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  cacheDuration: number = 5000 * 60,
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

export const clearExpiredCache = () => {
  const now = Date.now();
  for (const key in cache) {
    if (cache[key].expiry <= now) {
      delete cache[key];
    }
  }
};

setInterval(clearExpiredCache, 10 * 60 * 1000);
