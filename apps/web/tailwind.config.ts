import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.tsx', '@repo/ui/components/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
