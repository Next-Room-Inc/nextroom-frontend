// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: {
          50: "#7C221F",
        },
      },
    },
  },
  plugins: [],
};
