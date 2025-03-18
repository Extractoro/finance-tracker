import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xm': '520px',
      'sm': '640px',
      'md': '768px',
      'xd': '820px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        'header-background': "var(--header-background)",
        input: "var(--input)",
        "input-border": "var(--input-border)",
        button: "var(--button)",
        hover: "var(--hover)",
        link: "var(--link)",
        accent: "var(--accent)",
        'dark-accent': "var(--dark-accent)",
        border: "var(--border)",
      },
      animation: {
        enter: "enter .2s ease-out",
        leave: "leave .15s ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": {
            opacity: "0",
            transform: "scale(.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        leave: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(.9)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
