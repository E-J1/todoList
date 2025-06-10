const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "744px",
      lg: "1200px",
      // => @media (min-width: 1280px) { ... }
      desktop: "1200px", // ≥1200px
      tablet: "744px", // ≥744px
      mobile: "375px", // ≥375px 에서 mobile: 동작
    },
    // screens: {
    // },
    extend: {
      maxWidth: {
        desktop: "1200px",
        tablet: "744px",
        mobile: "375px",
      },
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        bold: "700",
      },
      fontSize: {
        "heading-xl": ["20px", "1.6"],
        "heading-lg": ["18px", "1.6"],
        "heading-md": ["16px", "1.6"],
        "body-md": ["16px", "1.6"],
      },
      colors: {
        gray: {
          50: "#F9FAFB",
        },
        slate: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          800: "#1E293B",
          900: "#0F172A",
        },
        violet: {
          100: "#EDE9FE",
          600: "#7C3AED",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const fontSize = theme("fontSize.heading-xl")[0];
      const lineHeight = theme("fontSize.heading-xl")[1];
      const fontWeight = theme("fontWeight.bold");

      addUtilities({
        ".detail-todo": {
          fontSize,
          lineHeight,
          fontWeight,
        },
      });
    }),
  ],
  darkMode: "class",
};
