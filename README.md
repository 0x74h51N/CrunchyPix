# Introduction

This project began with the goal of creating a personal website to showcase my skills and portfolio. I have chosen "CrunchyPix" as the website and brand name. This website supports multiple languages through i18n and was built from scratch using Next.js 14. Although Tailwind CSS and DaisyUI are used for styling, the site also includes custom UI elements and components, such as [Dropdown](/components/buttons/Dropdown.tsx) or [Acordiona](/app/about/components/Accordiona.tsx). Localization is handled both on the [server](/i18n/server.ts) and [client](/i18n/client.ts) sides[\*](/i18n/settings.ts), without relying on routing, by configuring i18n on the server to detect and set the language based on the user's browser or referrer information. Third-party services like Cloudinary, Supabase, and Vercel Analytics / SpeedInsight have been integrated, ensuring that Vercel Analytics or SpeedInsight are not activated without user consent, and no personal information is collected without permission.

## 📦 Technology Stack

### Frameworks & Libraries

- [Next.js 14](https://nextjs.org) - React framework for server-side rendering and static site generation.
- [React 18](https://reactjs.org) - JavaScript library for building user interfaces.
- [Redux](https://redux.js.org) & [@reduxjs/toolkit](https://redux-toolkit.js.org) - State management.
- [React-Redux](https://react-redux.js.org) - Official React bindings for Redux.
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React.
- [React Hook Form](https://react-hook-form.com) - Form handling in React.
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library for React.
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering in React.
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Syntax highlighting component for React.
- [React PageFlip](https://www.npmjs.com/package/react-pageflip) - React component for creating book-like flip pages.

### Styling

- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework.
- [DaisyUI](https://daisyui.com) - Tailwind CSS component library.
- [PostCSS](https://postcss.org) & [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS processing tools.
- [PostCSS Nesting](https://github.com/csstools/postcss-nesting) - Support for nested CSS rules.
- [Swiper](https://swiperjs.com/react) - Modern mobile touch slider with hardware-accelerated transitions.

### Internationalization (i18n)

- [i18next](https://www.i18next.com) - Internationalization framework.
- [React-i18next](https://react.i18next.com) - React bindings for i18next.

### Data & Content Management

- [Supabase](https://supabase.com) - Open-source alternative to Firebase, used as a backend-as-a-service (BaaS).
- [Zod](https://zod.dev) - TypeScript-first schema declaration and validation library.
- [xss](https://www.npmjs.com/package/xss) - A filter to sanitize user input to prevent XSS attacks.

### Utilities

- [Nodemailer](https://nodemailer.com) - Email sending library.
- [Country-Flag-Icons](https://github.com/catamphetamine/country-flag-icons) - Collection of country flag icons.
- [Cookies-next](https://github.com/cookie-notice/cookies-next) - Utility for handling cookies in Next.js applications.

### Third-party Services

- [Cloudinary](https://cloudinary.com) - Image management in the cloud.
- [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/speed-insights) - Tools for monitoring and analyzing website performance.

### Development Tools

- [TypeScript](https://www.typescriptlang.org) - Typed JavaScript at any scale.
- [ESLint](https://eslint.org) & [eslint-config-next](https://nextjs.org/docs/basic-features/eslint) - Linting tools.
- [Prettier](https://prettier.io) - Code formatter.
- [Globals](https://www.npmjs.com/package/globals) - Global variables and functions in Node.js and browser environments.

### Build & Deployment

- [Vercel](https://vercel.com) - Platform for deploying static sites and serverless functions.

## 🗃️ Directory

```
├── LICENSE.md
├── README.md
├── app
│   ├── about
│   │   ├── components
│   │   └── page.tsx
│   ├── actions
│   │   └── sendMailAction.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── policies
│   │   └── [id]
│   └── portfolio
│       ├── [id]
│       ├── components
│       ├── layout.tsx
│       └── page.tsx
├── components
│   ├── Buttons
│   │   ├── ArrowButton.tsx
│   │   ├── ArrowSVG.tsx
│   │   ├── ArrowToTop.tsx
│   │   ├── BurgerButton.tsx
│   │   ├── CancelButton.tsx
│   │   ├── Dropdown.tsx
│   │   └── IconButton.tsx
│   ├── CardMaker.tsx
│   ├── ColorfulBorder.tsx
│   ├── ColorfulHover.tsx
│   ├── Construction.tsx
│   ├── Cookies
│   │   ├── Cookies.tsx
│   │   └── CookiesConsent.tsx
│   ├── CustomCursor.tsx
│   ├── CustomLink.tsx
│   ├── Footer
│   │   ├── Captcha.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── FooterColumn.tsx
│   ├── Frames
│   │   ├── MonitorFrame
│   │   └── PhoneFrame
│   ├── GenerateSpans.tsx
│   ├── Labels.tsx
│   ├── Loading
│   │   ├── FsLoading.tsx
│   │   └── Loading.tsx
│   ├── LogoImage.tsx
│   ├── Navbar
│   │   ├── CrunchyLogo.tsx
│   │   ├── LanguageMenu.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Navbar.tsx
│   ├── PortfolioDataStore.tsx
│   ├── RooteTitles
│   │   ├── AllRoutes.tsx
│   │   ├── MainRoutes.tsx
│   │   ├── SubRoutes.tsx
│   │   └── checkIfPageExist.ts
│   ├── Sections
│   │   ├── CodeSect
│   │   ├── DesignSect
│   │   ├── IntroductionSect
│   │   ├── LandingSect
│   │   ├── LogoSection
│   │   ├── PortfolioSect
│   │   ├── Section.tsx
│   │   ├── ServicesSect
│   │   └── TitleText.tsx
│   ├── Slider
│   │   ├── FullScreenSlider
│   │   ├── LogoSlide.tsx
│   │   └── Portfolio
│   ├── SocialIcons.tsx
│   ├── SvgAnimator.tsx
│   └── typeText.tsx
├── constants
│   ├── codeString.ts
│   ├── colorPacks.ts
│   ├── index.ts
│   ├── phoneSlides.ts
│   ├── policyDatas.ts
│   └── sections.tsx
├── global.d.ts
├── hooks
│   ├── useBlurUrl.ts
│   ├── useClickableHandlers.ts
│   ├── useDragHandler.ts
│   ├── useFilteredData.ts
│   ├── useIntersectionObserver.ts
│   ├── useOutsideClick.ts
│   ├── useSupabaseFetch.ts
│   ├── useThrottle.ts
│   └── useTranslation.ts
├── i18n
│   ├── actions
│   │   └── switch-locale.ts
│   ├── client.ts
│   ├── i18Provider.tsx
│   ├── locales
│   │   ├── de
│   │   ├── en
│   │   └── tr
│   ├── resourcesToBackend.ts
│   ├── server.ts
│   └── settings.ts
├── lib
│   ├── metadata.ts
│   ├── metadataSub.ts
│   ├── supabaseClient.ts
│   └── utils
│       ├── cache.ts
│       ├── fetchSupabaseData.ts
│       └── filterByLanguage.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── LogoL.svg
│   ├── arrow.svg
│   ├── fonts
│   │   └── britannic-bold
│   ├── logo.svg
│   ├── logoRight.svg
│   ├── logo_L.svg
│   ├── logo_leftw.svg
│   ├── ogImage.avif
│   ├── phone.svg
│   ├── projectInfo.png
│   └── rotateArrow.svg
├── schemas
│   └── index.ts
├── store
│   ├── index.ts
│   ├── provider.tsx
│   └── redux
│       ├── cookieConsent.ts
│       ├── cursorDisabled.ts
│       ├── isClickable.ts
│       ├── isScrollEnabled.ts
│       ├── isSlider.ts
│       ├── isTouch.ts
│       ├── pageReducer.ts
│       ├── portfolioItems.ts
│       ├── sectionItems.ts
│       └── selectedSlide.ts
├── tailwind.config.ts
├── tsconfig.json
├── types
│   ├── common.types.ts
│   └── turnstile.d.ts
└── utils
    ├── getRandomColor.ts
    ├── handleScroll.ts
    ├── logoComponent.ts
    ├── motion.ts
    ├── randomColors.ts
    ├── scrollEventControl.ts
    └── scrollToSection.ts
```

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for more details.

## 🚀 Getting Started

### 👜 Requirements

Before you begin, you need to install the following tools:

- [Node (v18 or v20 LTS)](https://nodejs.org/en/download/)
- npm v6.0.0 or higher
- [Git](https://git-scm.com/downloads)

### ⚙️ Installation

Install dependencies:

```bash
npm install
```

Run on dev mode:

```bash
npm run dev
```

Build command:

```bash
npm run build
#and
npm run start
```

- Open [http://localhost:3000](http://localhost:8080)

