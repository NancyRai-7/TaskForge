/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#77964b',
          dark: '#526c34',
          soft: '#edf3e5',
        },
        lime: {
          DEFAULT: '#c6f36a',
          dark: '#849f5a',
          soft: '#f0f4e8',
        },
        tf: {
          bg: '#f6f8f2',
          surface: '#ffffff',
          ink: '#20231f',
          'ink-2': '#687064',
          'ink-3': '#90978b',
          line: '#e7ebe1',
          nav: '#263126',
          'nav-ink': '#c1cbb9',
          warn: '#9d6418',
          'warn-soft': '#fff3dc',
          danger: '#b44e48',
          'danger-soft': '#ffebe7',
          ok: '#477953',
          'ok-soft': '#e8f2e8',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
