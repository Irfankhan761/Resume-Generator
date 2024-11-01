/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    fontFamily: {
      script: ["Dosis", "sans-serif"],
    },
    extend: {
      keyframes: {
        scrollingBanner: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scrolling-banner": "scrollingBanner 20s linear infinite",
      },
    },
  },
  plugins: [],
};
