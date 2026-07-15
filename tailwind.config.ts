import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F1E7',
        paper: '#FFFDF8',
        ink: '#1C1A16',
        line: '#E4DCC8',
        paprika: {
          DEFAULT: '#D94F2A',
          dark: '#B23D1E',
          light: '#F2D9CC',
        },
        gold: '#C79A3E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
        pop: 'pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
