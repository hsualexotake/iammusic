/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Replace 'Inter' with your chosen font
      },
      transitionDuration: {
        300: "300ms",
        500: "500ms",
        700: "700ms",
      },
      transitionTimingFunction: {
        "in-out-custom": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
