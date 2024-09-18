/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        britannic: ['"Britannic Bold"', 'sans-serif'],
      },
      keyframes: {
        beat: {
          '0%, 40%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.2)' },
          '60%': { transform: 'scale(1.2)' },
          '80%, 100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        beat: 'beat 2s ease-in-out infinite',
      },
      colors: {
        'cool-gray': {
          50: '#F7F7F7',
          100: '#E1E1E1',
          200: '#CFCFCF',
          300: '#B1B1B1',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2D2D2D',
          800: '#161616',
          900: '#111111',
        },
        'nav-border': '#EBEAEA',
        'back-col': '#111111',
        'nav-col': '#2a2a2a',
        'log-col': '#eeb30d',
        'gra-blue': '#3f4183',
        'gra-black': '#050816',
        'light-white': '#FAFAFB',
        'light-white-100': '#F1F4F5',
        'light-white-200': '#d7d7d7',
        'light-white-300': '#F3F3F4',
        'light-white-400': '#E2E5F1',
        'light-white-500': '#e0e0e0',
        gray: '#4D4A4A',
        'gray-100': '#3d3d4e',
        'black-100': '#252525',
        'primary-purple': '#9747FF',
        'gray-50': '#D9D9D9',
      },
      boxShadow: {
        menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
        card: '0px 15px 12px -15px #211e35',
      },
      screens: {
        xs: '400px',
        xsm: '500px',
        xmd: '850px',
      },
      maxWidth: {
        '10xl': '1680px',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#333333',
          secondary: '#4D4D4D',
          accent: '#666666',
          neutral: '#3D3D3D',
          'base-100': '#f9f9f9',
          'base-200': '#F0F0F0',
          'base-300': '#dedede',
          'base-content': '#1A1A1A',
          info: '#737373',
          success: '#4CAF50',
          warning: '#FFA726',
          error: '#F44336',
          pcolor: 'ffdaf9',

          h1: '#1A1A1A',
          h2: '#333333',
          h3: '#4D4D4D',
          text: '#3D3D3D',
        },
      },
      {
        dark: {
          primary: '#202020',
          secondary: '#2f2f2f',
          accent: '#383838',
          neutral: '#1A1A1A',
          'base-100': '#131313',
          'base-200': '#1a1a1a',
          'base-300': '#232323',
          'base-content': '#E0E0E0',
          info: '#616161',
          success: '#388E3C',
          warning: '#FFB74D',
          error: '#E57373',

          h1: '#E0E0E0',
          h2: '#C0C0C0',
          h3: '#A0A0A0',
          text: '#B0B0B0',
        },
      },
    ],
  },
};
