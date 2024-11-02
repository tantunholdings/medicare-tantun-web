// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Add this if you're using the app directory in Next.js 13+
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#56cbf9",
        third: "#dbeafe",
        primaryBlack: "#1F4552",
        line: "#EDEDED",
        textGray: "#8B8B8B",
      },
      fontSize: {
        "3xs": ".4rem",
        "2xs": ".6rem",
      },
    },
  },
  plugins: [],
};
