/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": {
          50: "#07b7f8",
          100: "#299ec4",
          200: "#2970c4",
          300: "#2942c4",
        },
      },
      textColor: {
        secondary: "#87909f",
      },
      fontFamily: {
        roboto: ["roboto", "sans-serif", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
