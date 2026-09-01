import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#000000",
        "navy-dark": "#0a0a0a",
        gold: "#000000",
        canvas: "#ffffff",
        ink: "#000000",
        muted: "#666666",
        line: "#e5e5e5",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "Arial", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "Arial", "sans-serif"],
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
