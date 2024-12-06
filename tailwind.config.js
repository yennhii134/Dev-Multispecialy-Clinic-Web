import { theme } from "./src/css/theme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        roboto: ["roboto", "sans-serif", "ui-sans-serif", "system-ui"],
        logo: ["Kanit", "sans-serif"],
        norge: ["Playwrite NO"],
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};

