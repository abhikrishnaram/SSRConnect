import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003E87',
        primaryTextColor: '#F9FAFB',
        secondary: '#1F91CF',
        secondaryTextColor: '#F9FAFB',
        background: '#F9FAFB',
        color: '#081c34',
        warning: '#EAB308',
        danger: '#EF4444',
        success: '#019E4B',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
