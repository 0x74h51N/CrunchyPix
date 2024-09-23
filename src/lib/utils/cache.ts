interface CacheEntry<T> {
  data: T;
  expiry: number;
}

let cache: { [key: string]: CacheEntry<any> } = {};
let timeoutId: NodeJS.Timeout | null = null;

const clearExpiredCache = (interval: number) => {
  const now = Date.now();
  for (const key in cache) {
    if (cache[key].expiry <= now) {
      delete cache[key];
    }
  }
  if (Object.keys(cache).length === 0 && timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  } else {
    timeoutId = setTimeout(() => clearExpiredCache(interval), interval);
  }
};

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

  if (!timeoutId) {
    clearExpiredCache(cacheDuration + 500);
  }
  return data;
};
