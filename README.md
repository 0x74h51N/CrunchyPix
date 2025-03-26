# Introduction

This repository contains the source code for CrunchyPix, a personal website designed to showcase skills and portfolio projects. Built from scratch using Next.js and TypeScript, the website supports multiple languages through i18next with localization handled on both the server and client sides. The design is modular and dynamic, ensuring long-term adaptability.

# Content Management

- **Supabase PostgreSQL**: Site content is managed via Supabase with PostgreSQL tables, ensuring secure and efficient data handling.
- **Prismic Headless CMS**: The blog content is managed through Prismic, enabling direct content creation and management via a user-friendly interface.

# Blog Functionality

The blog section is engineered for performance and seamless updates:

- **Incremental Static Regeneration (ISR)**: Updates blog pages efficiently without requiring a full site rebuild.
- **Webhooks and Rebuild Pipeline**:
  - **Prismic Webhooks**: Automatically trigger cache revalidation when content is updated.
- **Enhanced User Experience**:
  - Custom slices and unique styles create engaging, tailor-made blog posts.
  - Specialized UX elements, such as adjustable font sizes and expandable text frames, boost reader engagement.
  - Minimization of Client-Side Rendering (CSR) improves performance and reduces load times.

# 📦 Technology Stack

### Frameworks and Languages

- **Next.js 15**: Provides server-side rendering, static site generation, and dynamic routing.
- **TypeScript**: Enhances developer experience with static typing.
- **React**: Powers the component-based architecture for interactive UIs.

### Styling

- **Tailwind CSS**: Used for rapid, customizable styling.
- **DaisyUI**: Extends Tailwind with pre-built UI components.
- **Custom UI Elements**: Developed to deliver unique user interactions and design enhancements.

### State Management

- **Redux & Redux Toolkit**: Manages complex application state, including language preferences and custom cursor interactions.

### Data and Content Management

- **Supabase (PostgreSQL)**: Provides secure data storage and retrieval.
- **Prismic Headless CMS**: Facilitates blog content creation with custom slices for unique post structures.
- **Zod**: Ensures data integrity through schema validation.

### Animations & UI Enhancements

- **Framer Motion**: Implements smooth, engaging animations to bring the website to life.
- **React Markdown**: Renders markdown content for blog posts and documentation.
- **React Syntax Highlighter**: Displays code snippets with proper formatting and highlighting.
- **React Pageflip**: Provides interactive page-flipping effects for dynamic content presentation.
- **Swiper**: Enables the creation of responsive sliders and carousels.

### Form Handling and Validation

- **React Hook Form**: Efficiently manages form state and validation.
- **Cloudflare Turnstile**: Validates form submissions to prevent spam.
- **Nodemailer**: Sends emails via SMTP as part of the contact form functionality.

### Internationalization

- **i18next & React-i18next**: Seamlessly integrate localization across the application.

### Image Optimization

- **Cloudinary**: Optimizes images to ensure fast loading times while maintaining high visual quality.

### DevOps and Security

- **Cloudflare**: Handles DNS routing, Web Application Firewall (WAF), DDoS protection, SSL certificates, and HSTS configuration.
- **Vercel**: Manages deployment with Continuous Integration/Continuous Deployment (CI/CD) workflows.
- **GitHub**: Facilitates version control and collaboration.
- **Dependabot & CodeQL**: Enhance security and maintainability through dependency management and code scanning.

### Utilities

- **React Icons**: Offers a library of customizable icons.
- **CLSx**: A utility for constructing conditional `className` strings.
- **XSS**: Sanitizes user input to prevent Cross-Site Scripting attacks.
- **Remark Plugins**:
  - **remark-gfm**: Supports GitHub Flavored Markdown.
  - **remark-breaks**: Converts line breaks in markdown files.

### Analytics & Performance

- **Vercel Analytics & Vercel Speed Insights**: Offers insights into user interactions and site performance (with users’ consent).

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
