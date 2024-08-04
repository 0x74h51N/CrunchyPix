'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Coppied from https://gist.github.com/suhaotian/c2851d1938da31d349e8cfe65c97c47e
 * Thanks to the author.
 */

const scriptLink =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileRenderParameters = Turnstile.RenderParameters;

export default function Captcha(
  props: Pick<
    TurnstileRenderParameters,
    'action' | 'cData' | 'callback' | 'tabindex' | 'theme' | 'language'
  > & {
    sitekey?: TurnstileRenderParameters['sitekey'];
    errorCallback?: TurnstileRenderParameters['error-callback'];
    expiredCallback?: TurnstileRenderParameters['expired-callback'];
  },
) {
  const { t } = useTranslation(['index']);
  const { sitekey, errorCallback, expiredCallback, ...rest } = props;

  const widgetID = useRef<string>();
  const [isError, setIsError] = useState(false);

  function retry() {
    setIsError(false);
  }

  function onError(e?: string | Error) {
    console.log(`Captcha error`, e);
    setIsError(true);
    if (errorCallback) {
      errorCallback();
    }
  }

  function renderWidget() {
    try {
      widgetID.current = turnstile.render('#captcha-container', {
        ...rest,
        sitekey: sitekey || process.env.NEXT_PUBLIC_TURNSLITE_SITE_KEY || '',
        'error-callback': onError,
        'expired-callback': expiredCallback,
      });
      if (!widgetID.current) {
        throw new Error(`turnstile.render return widgetID=${widgetID.current}`);
      }
    } catch (e: unknown) {
      onError(e as Error);
    }
  }

  function onLoad() {
    renderWidget();
  }

  useEffect(() => {
    if (!widgetID.current && window.turnstile) {
      renderWidget();
    }
    return () => {
      window.turnstile?.remove(widgetID.current || '');
      widgetID.current = undefined;
    };
  }, []);

  return (
    <div className="absolute -bottom-[75px] gap-1 flex overflow-hidden">
      <div id="captcha-container"></div>
      {isError && (
        <div
          className="h-[65px] flexCenter flex-col  hover:shadow-form rounded-md bg-neutral-500 bg-opacity-70 py-2 px-3 text-sm font-semibold text-red-700 outline-none hover:bg-opacity-100 active:bg-log-col cursor-none"
          onClick={retry}
        >
          {t('contact.captchaError')}
          <span className="text-neutral-200 text-sm font-semibold">
            {t('contact.captchaRetry')}
          </span>
        </div>
      )}
      <Script
        src={scriptLink}
        onLoad={onLoad}
        onError={(e) => onError('load error: ' + e.message)}
      />
    </div>
  );
}
