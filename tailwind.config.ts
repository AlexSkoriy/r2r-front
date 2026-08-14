import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        desktop: "996px",
        fullscreen: "1921px",
        // desktop: "1472px",
        'ph': {'max': '531px'},
        'tablet': {'max': '1320px'},
        '1142': {'max': '1142px'},
        'low': { 'raw': '(max-height: 767px)' },
        'h1012': { 'raw': '(max-height: 1012px)' },
      },
      colors: {
        "main": "#F9563C",
        "main-secondary": "#b8341f",
        "skin": "#FDE9C2",
        "black": "#262626"
      },
      fontFamily: {
        "sans": ["'Suisse Intl'", 'ui-sans-serif', 'system-ui'],
        "drukcyr": ['"Druk Cyr"']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;
