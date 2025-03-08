import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        input: "var(--input)",
        "input-border": "var(--input-border)",
        button: "var(--button)",
        hover: "var(--hover)",
        link: "var(--link)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
