/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nerko: ["NerkoOne", "sans-serif"],
        Jersey: ["Jersey10", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#433D8B",
          DEFAULT: "#2E236C",
          dark: "#17153B",
        },
        secondary: {
          light: "#AD49E1",
          DEFAULT: "#7A1CAC",
          dark: "#2E073F ",
        },
      },
    },
  },
  plugins: [],
};
