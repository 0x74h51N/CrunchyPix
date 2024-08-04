'use client';

import useClickableHandlers from '@/hooks/useClickableHandlers';
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
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
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
    <div className="absolute -bottom-[75px] gap-1 flex overflow-hidden md:pointer-events-none">
      <div className="relative" id="captcha-container">
        <a
          className="absolute bottom-2 right-14 h-5 w-9 pointer-events-auto cursor-none"
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <a
          className="absolute bottom-2 right-3 h-5 w-9 pointer-events-auto cursor-none"
          href="https://www.cloudflare.com/website-terms/"
          target="_blank"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <a
          className="absolute bottom-8 right-3 h-8 w-20 pointer-events-auto cursor-none"
          href="https://www.cloudflare.com/products/turnstile/?utm_source=turnstile&utm_campaign=widget"
          target="_blank"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <Script
        src={scriptLink}
        onLoad={onLoad}
        onError={(e) => onError('load error: ' + e.message)}
      />
    </div>
  );
}
