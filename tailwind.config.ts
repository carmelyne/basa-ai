import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette — adult, dignified, Filipino-inspired
        forest: {
          50:  "#f0f7f4",
          100: "#daeee6",
          200: "#b8ddd0",
          300: "#8dc5b3",
          400: "#5fa894",
          500: "#3d8c78",
          600: "#2d6a5b",
          700: "#26574a",
          800: "#22453d",
          900: "#1e3a33",
        },
        earth: {
          50:  "#fef9f0",
          100: "#fdf0db",
          200: "#f9ddb5",
          300: "#f4c47e",
          400: "#eda54a",
          500: "#e58c28",
          600: "#d4711e",
          700: "#b0561a",
          800: "#8d441c",
          900: "#72391b",
        },
        terracotta: {
          400: "#d4785c",
          500: "#c5603e",
          600: "#a84e31",
        },
        cream: "#fef9f0",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Ensure readability — adults with low literacy need larger text
        base: ["1.125rem", { lineHeight: "1.75rem" }],    // 18px default
        lg:   ["1.25rem",  { lineHeight: "1.875rem" }],   // 20px
        xl:   ["1.5rem",   { lineHeight: "2rem" }],        // 24px
        "2xl": ["1.875rem", { lineHeight: "2.375rem" }],  // 30px
        "3xl": ["2.25rem",  { lineHeight: "2.75rem" }],   // 36px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "pulse-ring":     "pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
