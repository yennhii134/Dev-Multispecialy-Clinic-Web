import { theme } from "./src/config/theme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      textColor: theme.textColor,
      fontFamily: theme.fontFamily,
    },
  },
  plugins: [],
};
