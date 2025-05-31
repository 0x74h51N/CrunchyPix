# Introduction

CrunchyPix is a personal portfolio, built from scratch with Next.js and TypeScript.
Features include modular design, full localization (i18next), and custom UI components.

# Content Management

- **Supabase (PostgreSQL)**: Fast, secure storage for all non-blog content.
- **Prismic CMS**: Blog posts managed via a user-friendly editor and custom slices for unique layouts.

# Blog Features

- **Incremental Static Regeneration (ISR)**: Instant updates to blog pages, no full rebuild needed.
- **Prismic Webhooks**: Automatic cache revalidation after content changes.
- **Custom Blog Slices & UX**: Unique components, adjustable font sizes, expandable text frames.
- **Optimized Rendering**: Minimal client-side JS, faster load, and smooth reading.

# 📦 Technology Stack

**Frameworks:** Next.js 15, TypeScript, React  
**Styling:** Tailwind CSS, DaisyUI, Custom UI Elements  
**State:** Redux, Redux Toolkit  
**Data:** Supabase, Prismic, Zod  
**Animations:** Framer Motion, React Markdown, Syntax Highlighter, Pageflip, Swiper  
**Forms:** Cloudflare Turnstile, Nodemailer  
**i18n:** i18next, React-i18next  
**Images:** Cloudinary  
**DevOps:** Cloudflare, Vercel, GitHub, Dependabot, CodeQL  
**Utilities:** React Icons, CLSx, XSS, Remark Plugins  
**Analytics:** Vercel Analytics, Speed Insights

## 🗃️ Directory

```
├── app
│   ├── [lang]
│   │   ├── [...not_found]
│   │   ├── about                   # About page, includes components.
│   │   │   ├── components          # Specific components used within the About page.
│   │   ├── blog
│   │   │   ├── [uid]               # ISR blog content pages fetched from Prismic CMS.
│   │   │   ├── components          # UI elements and components related to Prismic slices.
│   │   │   ├── slice-simulator     # Slice Simulator for Prismic.
│   │   │   └── slices              # Custom slices like Code, Image, or RichText components.
│   │   ├── policies
│   │   │   └── [id]                # Dynamic subpages for each policy ([id]).
│   │   │       ├── components      # Components related to individual policy subpages.
│   │   └── portfolio
│   │       ├── [id]                # Dynamic subpages for each portfolio item ([id]).
│   │       │   ├── components      # Components for individual portfolio items' subpages.
│   │       ├── components          # General components used within the Portfolio page.
│   │       └── page.tsx
│   ├── actions                     # Server-side actions for processing inputs and managing cookies.
│   ├── api
│   │   ├── cron                    # API endpoint triggered by cron job for Vercel rebuild.
│   │   ├── exit-preview            # Endpoint to exit Prismic preview mode.
│   │   ├── preview                 # Prismic preview API endpoint to enter preview mode.
│   │   └── revalidate              # Webhook endpoint to revalidate 'prismic' tag cached pages.
│   └── styles                      # Global styles and style utilities.
├── components
│   ├── Buttons                 # Contains various buttons used across the site as like arrow, burger or dropdown buttons.
│   ├── Cookies                 # Manages user consent for enabling Vercel Analytics and Speedinsight.
│   ├── Footer                  # The footer component for the site, typically includes site links and credits.
│   ├── Frames                  # Contains components for displaying monitor and phone frames with embedded content.
│   ├── Loading                 # Components that display custom loading component.
│   ├── Navbar                  # The site's main navigation, language menu and mobile menu components.
│   ├── RootTitles              # Displays the current page or subsection title, used on pages other than the homepage.
│   ├── Sections                # Components that define different sections of the homepage.
│   └── Slider                  # Slider components, main page carousel slide. And full-screen slides, which adjusts to the size of the parent div.
├── constants               # Stores constant values used throughout the application.
├── hooks                   # Contains custom React hooks for managing state and side effects.
├── i18n                    # Contains i18next settings, providers, server and client side functions.
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
