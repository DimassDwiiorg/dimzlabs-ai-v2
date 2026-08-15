/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#08070d",
          900: "#0b0a12",
          850: "#0f0e18",
          800: "#131220",
          700: "#1a1828",
          600: "#242138",
        },
        accent: {
          400: "#8b7bff",
          500: "#6d5ef5",
          600: "#5a4de0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 80px rgba(109, 94, 245, 0.25)",
      },
    },
  },
  plugins: [],
};
