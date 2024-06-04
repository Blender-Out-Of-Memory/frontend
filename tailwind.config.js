/** @type {import('tailwindcss').Config} */
/**WICHTIG: Man kann nur die Dinger hier benutzen in extra Attributen von z.B. InputField, da sowas wie gray-300 sonst von tailwind nicht gerendert wird!!**/
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: {
          navy: 'var(--color-secondary-navy)',
          cream: 'var(--color-secondary-cream)',
          teal: 'var(--color-secondary-teal)',
        },

        accent: {
          charcoal: 'var(--color-accent-charcoal)',
          lightgrey: 'var(--color-accent-lightgrey)',
        },

        text: {
          normal: 'var(--color-text-normal)',
          white: 'var(--color-text-white)', /*NOTE: use only when primary is used since thats the only color that does not change */
        },

        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },

        button: {
          main: 'var(--color-button-main)',
        },

        inputField: {
          placeholder: 'var(--color-inputField-placeholder)',
          border: 'var(--color-inputField-border)',
        },

        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
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

