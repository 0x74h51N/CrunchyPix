# Introduction

This project began with the goal of creating a personal website to showcase my skills and portfolio. I have chosen "CrunchyPix" as the website and brand name. This website supports multiple languages through i18n and was built from scratch using Next.js 14. Although Tailwind CSS and DaisyUI are used for styling, the site also includes custom UI elements and components. Localization is handled both on the [server](/i18n/server.ts) and [client](/i18n/client.ts) sides[\*](/i18n/settings.ts). Third-party services like Cloudinary, Supabase, and Vercel Analytics / SpeedInsight have been integrated, ensuring that Vercel Analytics or SpeedInsight are not activated without user consent, and no personal information is collected without permission.

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
├── app
│   ├── actions                 # Contains server-side actions for validating and processing user inputs.
│   ├── about                   # About page, includes components.
│   │   └── components          # Specific components used within the About page.
│   ├── policies                # Contains components and dynamic subpages for each policy ([id]).
│   │   └── [id]
│   │       └── components      # Components related to individual policy subpages.
│   └── portfolio               # Portfolio main page, includes components and dynamically generated subpages.
│       ├── [id]
│       │   └── components      # Components for individual portfolio items' subpages.
│       └── components          # General components used within the Portfolio page.
├── components
│   ├── Buttons                 # Contains various buttons used across the site as like arrow, burger or dropdown buttons.
│   ├── Cookies                 # Manages user consent for enabling Vercel Analytics and Speedinsight.
│   ├── Footer                  # The footer component for the site, typically includes site links and credits.
│   ├── Frames                  # Contains components for displaying monitor and phone frames with embedded content.
│   ├── Loading                 # Components that display custom loading component.
│   ├── Navbar                  # The site's main navigation, language menu and mobile menu components.
│   ├── RootTitles              # Displays the current page or subsection title, used on pages other than the homepage.
│   ├── Sections                # Components that define different sections of the homepage.
│   │   ├── CodeSect            # Section focused on coding or development content.
│   │   ├── DesignSect          # Section related to design content.
│   │   ├── IntroductionSect    # The introduction section of the homepage.
│   │   ├── LandingSect         # Landing section, typically the first visible section on the homepage.
│   │   ├── LogoSection         # Displays logos or branding elements.
│   │   ├── PortfolioSect       # Section showcasing portfolio items.
│   │   └── ServicesSect        # Section outlining the services offered.
│   └── Slider
│       ├── FullScreenSlider    # A slider component that adjusts to the size of the parent div, creating full-screen slides.
│       └── Portfolio           # Contains a Carousel slider for portfolio items with Modal components for detailed views.
├── constants               # Stores constant values used throughout the application.
├── hooks                   # Contains custom React hooks for managing state and side effects.
├── i18n                    # Contains i18next settings, providers, server and client side functions.
│   ├── actions             # Actions related to internationalization (i18n).
│   └── locales             # Contains translation files and locale-specific data.
├── lib                     # Contains meta data generate functions, Supabase client settings.
│   └── utils               # Contains server side Supabase fetch function, custom query cache function and language filter function.
├── public
├── schemas                 # Defines schemas and types for data validation on fetched PostgreSQL data.
├── store                   # Redux store configuration and provider component.
│   └── redux               # Contains related store files.
├── types                   # TypeScript type definitions used throughout the project.
└── utils                   # Miscellaneous utility functions and helpers.

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
