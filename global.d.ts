declare global {
  interface Window {
    turnstile?: {
      render: (container: string, options: TurnstileRenderParameters) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileRenderParameters = {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  'error-callback'?: (error?: string | Error) => void;
  'expired-callback'?: VoidFunction;
  theme?: 'auto' | 'light' | 'dark';
  tabindex?: number;
  language?: string;
};

export {};
