/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    letterSpacing: {
      wider: ".1em",
      widest: ".25em",
    },

    extend: {
      fontFamily: {
        Hanken: ["Hanken Grotesk", "sans-serif"],
        Hina: ["Hina Mincho", "serif"],
      },
    },
  },
  plugins: [],
};
