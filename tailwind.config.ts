import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
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
      },
      typography: ({ theme }: { theme: any }) => ({
        info: {
          css: {
            "--tw-prose-body": theme("colors.main-text"),
            "--tw-prose-headings": theme("colors.main-header"),
            "--tw-prose-links": theme("colors.link"),
            "--tw-prose-bold": theme("colors.main-header"),
          },
        },
        feedback: {
          css: {
            "--tw-prose-body": theme("colors.stone[100]"), // Light off-white for body text
            "--tw-prose-headings": theme("colors.stone[50]"), // Pure white for headings
            "--tw-prose-lead": theme("colors.stone[200]"), // Slightly dimmer white for lead text
            "--tw-prose-links": theme("colors.blue[300]"), // Light blue for contrast
            "--tw-prose-bold": theme("colors.stone[50]"), // Bright white for bold text
            "--tw-prose-counters": theme("colors.stone[300]"), // Softer white for counters
            "--tw-prose-bullets": theme("colors.stone[200]"), // Subtle light gray for bullets
            "--tw-prose-hr": theme("colors.stone[400]"), // Faint divider line
            "--tw-prose-quotes": theme("colors.stone[50]"), // Bright white quotes
            "--tw-prose-quote-borders": theme("colors.stone[300]"), // Soft white borders
            "--tw-prose-captions": theme("colors.stone[200]"), // Light gray for captions
            "--tw-prose-code": theme("colors.amber[300]"), // Warm light yellow for code
            "--tw-prose-pre-code": theme("colors.stone[50]"), // White for inline code
            "--tw-prose-pre-bg": theme("colors.stone[800]"), // Dark gray background for code blocks
            "--tw-prose-th-borders": theme("colors.stone[300]"), // Faint borders for tables
            "--tw-prose-td-borders": theme("colors.stone[400]"), // Slightly darker borders
            p: {
              marginTop: "0em",
              marginBottom: "0.5em",
            },
            "h1, h2, h3, h4, h5, h6, li, blockquote": {
              lineHeight: "1.5",
              marginTop: "0em",
              marginBottom: "0em",
              wordBreak: "break-words",
            },
            ":last-child": {
              marginBottom: "0em",
            },
            maxWidth: "100ch",
          },
        },
      }),
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" },
          "50%": { transform: "translateX(3px)" },
          "75%": { transform: "translateX(-3px)" },
        },
        subtlePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        shake: "shake 0.2s ease-in-out",
        subtlePulse: "subtlePulse 1s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
