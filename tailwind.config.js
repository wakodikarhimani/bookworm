/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0f1117",
          800: "#1a1d27",
          700: "#22263a",
          600: "#2c3149",
        },
        accent: {
          blue: "#3b82f6",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
