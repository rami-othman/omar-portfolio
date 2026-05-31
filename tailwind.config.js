/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1b",
        graphite: "#4e4b46",
        paper: "#f3efe5",
        "paper-deep": "#e9e2d5",
        canvas: "#e7e0d3",
        rule: "rgba(29, 29, 27, 0.2)",
      },
      boxShadow: {
        book: "0 30px 70px rgba(45, 39, 32, 0.2), 0 6px 18px rgba(45, 39, 32, 0.12)",
        page: "0 18px 45px rgba(45, 39, 32, 0.11)",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', '"Helvetica Neue"', "sans-serif"],
        mono: ['"IBM Plex Mono"', '"Courier New"', "monospace"],
      },
      letterSpacing: {
        editorial: "0.18em",
      },
    },
  },
  plugins: [],
};
