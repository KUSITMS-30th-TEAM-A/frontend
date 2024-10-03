import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "!./node_modules",
  ],
  theme: {
    extend: {
      fontSize: {
        "3xl": ["24px", "150%"],
        "2xl": ["22px", "150%"],
        xl: ["20px", "150%"],
        lg: ["18px", "150%"],
        md: ["16px", "150%"],
        sm: ["14px", "150%"],
      },
      
      fontWeight: {

      },

      colors: {

      },

      screens: {
        desktop: "1080px",
        tablet: "767px",
        mobile: "390px",
      },
    },
  },
  plugins: [],
};
export default config;
