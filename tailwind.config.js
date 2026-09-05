/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050607',
          900: '#090B0F',
          850: '#0D1016',
          800: '#141821',
          700: '#1C2230',
          600: '#262E40',
        },
        steel: {
          50: '#F4F6FB',
          100: '#E6EAF3',
          200: '#C9D1E3',
          300: '#A3B0CC',
          400: '#7C8CAE',
          500: '#5A6B8F',
          600: '#3F4E6E',
        },
        accent: {
          50: '#EAF0FF',
          100: '#D4E0FF',
          200: '#A9C2FF',
          300: '#7BA0FF',
          400: '#4E7CFF',
          500: '#2D5BF0',
          600: '#1E42C4',
          700: '#162F94',
          800: '#101E63',
          900: '#0A143F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.22em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ambient: {
          '0%, 100%': { transform: 'translate3d(-6%, -4%, 0) scale(1.08)' },
          '50%': { transform: 'translate3d(6%, 4%, 0) scale(1.16)' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(0)', opacity: '0.2' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0.2' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        ambient: 'ambient 24s ease-in-out infinite',
        scrollHint: 'scrollHint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
