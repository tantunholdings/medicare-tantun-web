/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01B97B",
        secondary: "#00AFCA",
        primaryBlack: "#1F4552",
        line: "#EDEDED",
        textGray: "#8B8B8B",
      },
    },
  },
  plugins: [],
};
