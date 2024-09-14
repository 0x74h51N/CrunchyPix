# Introduction

This repository contains the source code for CrunchyPix, a personal website designed to showcase skills and portfolio projects. Built from scratch using Next.js 14 and TypeScript, the website supports multiple languages through i18next, with localization handled on both the server and client sides.

Styling is implemented using Tailwind CSS and DaisyUI, alongside custom UI elements and components. The project demonstrates the use of modular, dynamic, and custom components to create a long-lasting and easily adaptable design.

# Content Management

- Supabase PostgreSQL: Site content is managed using Supabase with PostgreSQL tables, ensuring secure and efficient data handling.
- Prismic Headless CMS: The blog section is integrated with Prismic Headless CMS, allowing content creation and management directly through the CMS.

## Blog Functionality

Incremental Static Regeneration (ISR): Employed for the blog pages to efficiently update content without the need for full site rebuilds.

- Webhooks and Rebuild Pipeline:

  - A webhook is set up on Prismic to trigger cache revalidation whenever content is updated.
  - A rebuild pipeline is configured to refresh staticParams by rebuilding the site, ensuring that new content and changes are reflected promptly.

- Optimized User Experience:
  - Special design and UX elements have been developed in the blog section to enhance reader engagement.
  - Client-Side Rendering (CSR) is minimized to improve performance and reduce load times.

## 📦 Technology Stack

- ### Frameworks and Languages

  - **Next.js 14**: Used for building the application with server-side rendering, static site generation, and dynamic routing.
  - **TypeScript**: Provides static typing for improved developer experience and code reliability.
  - **React**: Powers the component-based architecture for building interactive user interfaces.

- ### Styling

  - **Tailwind CSS**: Utilized for rapid and customizable styling throughout the site.
  - **DaisyUI**: Extends Tailwind CSS with pre-built UI components to accelerate development.
  - **Custom UI Elements**: Developed for unique user interactions and to enhance the overall design.

- ### State Management

  - **Redux**: Manages complex application state, including language preferences and custom cursor interactions.

- ### Data and Content Management

  - **Supabase (PostgreSQL)**: Manages site content with secure data storage and retrieval using PostgreSQL tables.
  - **Prismic Headless CMS**: Integrated for managing blog content, allowing for content creation through the CMS with custom slices for unique styles and structures.
  - **Zod**: Used for schema validation to ensure data integrity when fetching and processing data.

- ### Animations

  - **Framer Motion**: Implements smooth and engaging animations, adding life to the website and enhancing user engagement.

- ### Form Handling and Validation

  - **React Hook Form**: Manages form state and validation efficiently.
  - **Cloudflare Turnstile**: Validates form submissions to prevent spam and ensure security.
  - **Nodemailer**: Sends emails via SMTP service as part of the contact form functionality.
  - **Next.js Server Actions**: Processes form data on the server side, integrating with email services and automation tools like Zoho Campaign.

- ### Internationalization

  - **i18next**: Manages multiple languages, enhancing the global user experience.
  - **React-i18next**: Integrates i18next with React components for seamless localization.

- ### Image Optimization

  - **Cloudinary**: Optimizes images to ensure fast loading times and maintains high-quality visuals across the site.

- ### Blog Functionality

  - **Incremental Static Regeneration (ISR)**: Used for blog pages to efficiently update content without full site rebuilds.
  - **Webhooks and Rebuild Pipeline**:
    - **Prismic Webhooks**: Trigger cache revalidation whenever content is updated.
    - **Cron Jobs**: Set up to refresh `staticParams` by rebuilding the site nightly, ensuring new content is promptly reflected.
  - **Custom Slices and Styles**: Applied in Prismic to create unique styles and structures within blog posts.
  - **Enhanced UX Elements**: Developed in the blog section, including menu components for adjusting font size and expanding text frames.
  - **Minimized CSR**: Client-Side Rendering is minimized to improve performance and reduce load times.

- ### DevOps and Security

  - **Cloudflare**: Manages domain and mail services, including DNS routing, Web Application Firewall (WAF), DDoS protection, SSL certificates, and HSTS configuration.
  - **Vercel**: Handles deployment and provides Continuous Integration/Continuous Deployment (CI/CD) workflows.
  - **GitHub**: Used for version control and collaboration.
  - **Dependabot** and **CodeQL**: Employed for dependency management and code scanning to enhance security and maintainability.

- ## Utilities

  - **React Icons**: Provides a library of customizable icons for use in React applications.
  - **CLSx**: Utility for constructing `className` strings conditionally.
  - **XSS**: Used for sanitizing user input to prevent Cross-Site Scripting attacks.
  - **Remark Plugins**:
    - **remark-gfm**: Supports GitHub Flavored Markdown.
    - **remark-breaks**: Converts line breaks in markdown files.

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
