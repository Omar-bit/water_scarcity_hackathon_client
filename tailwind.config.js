/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        main: '#16423C',
        secondary: '#6A9C89',
        aux: '#C4DAD2',
        bg: '#ebf499',
      },
    },
  },
  plugins: [],
};
