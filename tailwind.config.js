/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0b",
        graphite: "#4a4a4a",
        paper: "#ffffff",
        "paper-deep": "#f6f6f4",
        canvas: "#fbfbfa",
        rule: "rgba(11, 11, 11, 0.16)",
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
