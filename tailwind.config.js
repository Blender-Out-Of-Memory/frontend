/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: {
          navy: '#003366',
          cream: '#FFF3E0',
          teal: '#007D7C'
        },
        accent: {
          charcoal: '#36454F',
          lightgrey: '#D3D3D3'
        },
        darktext: '#333333',
        lighttext: '#FFFFFF',
        background: {
          light: '#FAFAFA',
          dark: '#282828'
        },
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFEB3B',
        info: '#2196F3'
      },
      spacing: {
        '128' : '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '200': '50rem',
        '240': '60rem',
        '288': '72rem',
        '320': '80rem',
        '360': '90rem',
        '400': '100rem',
      }
    },
  },
  plugins: [],
};

