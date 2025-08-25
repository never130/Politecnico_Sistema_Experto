/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf6f6',
          100: '#b8e0e6',
          200: '#7ed6df',
          300: '#48b1f3',
          400: '#5f6caf',
          500: '#3a506b', // azul petróleo
          600: '#5f4b8b', // violeta
          700: '#00b8a9', // aqua
          800: '#ff6f61', // coral suave
        },
        medical: {
          50: '#eaf6f6',
          100: '#b8e0e6',
          500: '#3a506b',
          600: '#5f4b8b',
          700: '#00b8a9',
          800: '#ff6f61',
        },
        accent: {
          100: '#f9e7e7',
          200: '#f7cac9',
          300: '#92a8d1',
          400: '#b8a9c9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
