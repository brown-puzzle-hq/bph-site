import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors"; // Change this line

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Main is the primary color of the site
        "main-bg": "#452c63",
        "main-text": "#faf7fd", // whiter than it should be, but we need the brightness
        "main-header": "#e7e3fc",
        "main-accent": "#d4a7fc",

        // Secondary is for text fields
        "secondary-bg": "#e7e3fc",
        "secondary-text": colors.gray[300], // This text goes with a dark background
        "secondary-accent": colors.black, // This text goes with a light background

        // Other backgrounds
        "footer-bg": "#322046",
        "nav-bg": "#452c63",
        "tooltip-bg": colors.gray[900],

        // Other text colors
        link: colors.blue[300],
        "correct-guess": colors.emerald[300],
        "partial-guess": colors.yellow[300],
        "incorrect-guess": colors.rose[300],
        error: colors.red[400],

        // Colors
        mahogany: {
          "50": "#fff0f0",
          "100": "#ffdddd",
          "200": "#ffc1c1",
          "300": "#ff9696",
          "400": "#ff5a5a",
          "500": "#ff2727",
          "600": "#fb0707",
          "700": "#d40101",
          "800": "#ae0606",
          "900": "#900c0c",
          "950": "#4e0000",
        },

        crimson: {
          "50": "#fff0f0",
          "100": "#ffdddd",
          "200": "#ffc0c0",
          "300": "#ff9494",
          "400": "#ff5758",
          "500": "#ff2324",
          "600": "#ec0001",
          "700": "#d70001",
          "800": "#b10304",
          "900": "#920a0b",
          "950": "#500000",
        },
      },
      typography: ({ theme }: { theme: any }) => ({
        custom: {
          css: {
            "--tw-prose-body": theme("colors.main-text"),
            "--tw-prose-headings": theme("colors.main-header"),
            // "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.link"),
            "--tw-prose-bold": theme("colors.main-header"),
            // "--tw-prose-counters": theme("colors.pink[600]"),
            // "--tw-prose-bullets": theme("colors.pink[400]"),
            // "--tw-prose-hr": theme("colors.pink[300]"),
            // "--tw-prose-quotes": theme("colors.pink[900]"),
            // "--tw-prose-quote-borders": theme("colors.pink[300]"),
            // "--tw-prose-captions": theme("colors.pink[700]"),
            // "--tw-prose-code": theme("colors.pink[900]"),
            // "--tw-prose-pre-code": theme("colors.pink[100]"),
            // "--tw-prose-pre-bg": theme("colors.pink[900]"),
            // "--tw-prose-th-borders": theme("colors.pink[300]"),
            // "--tw-prose-td-borders": theme("colors.pink[200]"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
