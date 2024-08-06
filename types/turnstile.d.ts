declare const turnstile: Turnstile.Turnstile;

declare namespace Turnstile {
  interface Turnstile {
    render(
      container: string | HTMLElement,
      params: RenderParameters,
    ): string | undefined;
    reset(widgetId: string): void;
    remove(widgetId: string): void;
    getResponse(widgetId: string): string;
  }

  type Theme = 'auto' | 'light' | 'dark';

  interface RenderParameters {
    sitekey: string;
    action?: string;
    cData?: string;
    callback?: (token: string) => void;
    'expired-callback'?: VoidFunction;
    'error-callback'?: (error?: string | Error) => void;
    theme?: Theme;
    tabindex?: number;
    language?: string;
  }
}
