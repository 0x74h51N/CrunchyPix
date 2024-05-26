/***
 * This util copied from the resourcesToBackend npm package repo
 * https://github.com/i18next/i18next-resources-to-backend/blob/main/src/index.js
 ***/

import { BackendModule, ReadCallback } from 'i18next';

const resourcesToBackend = (
  res: (language: string, namespace: string) => Promise<any> | any
): BackendModule => ({
  type: 'backend',
  init() {
  },
  read(language: string, namespace: string, callback: ReadCallback) {
    if (typeof res === 'function') {
      if (res.length < 3) {
        try {
          const result = res(language, namespace);
          if (result && typeof result.then === 'function') {
            result.then((data: { default: string; }) => callback(null, (data && data.default) || data)).catch(callback);
          } else {
            callback(null, result);
          }
        } catch (err) {
          console.log(err);
        }
        return;
      }
      res(language, namespace); 
      return;
    }
    callback(null, res && res[language] && res[language][namespace]);
  }
});

export default resourcesToBackend;
