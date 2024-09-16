import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          50: "#f4e6ff",
          100: "#e6ccff",
          200: "#cc99ff",
          300: "#b366ff",
          400: "#9933ff",
          500: "#8000ff",
          600: "#6600cc",
          700: "#4d0099",
          800: "#330066",
          900: "#1a0033",
        },
        secondary: {
          50: "#f4f4f4",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
        },
        type: {
          junior: "#ffcc00",
          seniors: "#ff6600",
          ladies: "#ff0000",
          outing: "#00cc00",
          mens: "#000fff",
          task: "#6600cc",
          open: "#ffcc00",
          upTheMiddle: "#ff6600",
          close: "#ff0000",
          custom: "#00cc00",
        },
      },
    },
  },
  plugins: [],
};

export default config;
