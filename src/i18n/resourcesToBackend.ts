import { BackendModule, ReadCallback, ResourceKey } from 'i18next';

const resourcesToBackend = (
  res: (
    language: string,
    namespace: string,
  ) => Promise<ResourceKey | boolean | null | undefined>,
): BackendModule => ({
  type: 'backend',
  init() {},

  read(language: string, namespace: string, callback: ReadCallback) {
    if (typeof res === 'function') {
      if (res.length < 3) {
        try {
          const result = res(language, namespace);

          if (result && typeof result.then === 'function') {
            result
              .then((data) => {
                callback(
                  null,
                  (data && typeof data === 'object' && 'default' in data
                    ? data.default
                    : data) || data,
                );
              })
              .catch((err) => {
                callback(err, false);
              });
          } else {
            callback(null, result);
          }
        } catch (err) {
          console.error(err);
          callback(err as Error, false);
        }
        return;
      }
      res(language, namespace)
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          callback(err, false);
        });
      return;
    }
    callback(null, res && res[language] && res[language][namespace]);
  },
});

export default resourcesToBackend;
