/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "abi-seth-ne-green": "#339C96",
        "abi-seth-ne-blue": "#6366F1",
        "abi-seth-ne-blue-1": "#818CF8",
        "abi-seth-ne-black": "#1E1E1E",
        "abi-seth-ne-black-1": "#4B4B4B",
        "abi-seth-ne-gray": "#D9D9D9",
        "abi-seth-ne-gray-1": "#BFBFBF",
      },
      fontFamily: {
        "abi-seth-ne-poppins": ["Poppins", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    display: ["responsive"],
  },
  plugins: [],
}
