import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1580px",
      },
    },
    extend: {
      colors: {
        primary: "#1bb09d",
      },
    },
  },
  plugins: [],
};

export default config;
