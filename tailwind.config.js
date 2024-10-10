import { theme } from "./src/theme/theme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fontFamily,
    },
  },
  plugins: [require("daisyui")],
};
