import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1bb09d",
      },
    },
  },
  plugins: [],
};

export default config;
