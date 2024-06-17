interface CacheEntry<T> {
  data: T;
  expiry: number;
}

let cache: { [key: string]: CacheEntry<any> } = {};

export const getCachedData = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  cacheDuration: number = 5 * 60 * 1000,
): Promise<T> => {
  const now = Date.now();

  if (cache[key] && cache[key].expiry > now && cache[key].data) {
    const cachedData = cache[key].data;

    if (Array.isArray(cachedData) && cachedData.length > 0) {
      return cachedData as T;
    }

    if (
      typeof cachedData === 'object' &&
      cachedData !== null &&
      Object.keys(cachedData).length > 0
    ) {
      return cachedData as T;
    }
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

setInterval(clearExpiredCache, 6 * 60 * 1000);
