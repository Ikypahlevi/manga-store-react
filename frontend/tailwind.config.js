/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        secondary: '#FFD166',
        accent: '#06D6A0',
        dark: '#111827',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        comic: ['Bangers', 'cursive'],
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px rgba(0,0,0,1)',
        'comic-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'comic-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
        'comic-dark': '4px 4px 0px 0px rgba(255,255,255,0.2)',
        'comic-lg-dark': '8px 8px 0px 0px rgba(255,255,255,0.2)',
        'comic-hover-dark': '2px 2px 0px 0px rgba(255,255,255,0.2)',
      },
      keyframes: {
        'float-comic': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'wobble-neo': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'pulse-shadow': {
          '0%, 100%': { boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' },
          '50%': { boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)', transform: 'translateY(-2px)' },
        }
      },
      animation: {
        'float-comic': 'float-comic 3s ease-in-out infinite',
        'wobble-neo': 'wobble-neo 2s ease-in-out infinite',
        'pulse-shadow': 'pulse-shadow 2s infinite',
      }
    },
  },
  plugins: [],
}
