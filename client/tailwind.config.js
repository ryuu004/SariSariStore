/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ],
        display: [
          'Poppins',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          600: '#D97706',
          700: '#B45309',
        },
        danger: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          600: '#E11D48',
          700: '#BE123C',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        72: '18rem',
      },
      boxShadow: {
        soft: '0 2px 6px 0 rgba(24, 39, 75, 0.04), 0 12px 24px -4px rgba(24, 39, 75, 0.06)',
        elevated: '0 6px 16px 0 rgba(24, 39, 75, 0.08), 0 20px 32px -8px rgba(24, 39, 75, 0.12)',
      },
    },
  },
  plugins: [],
};