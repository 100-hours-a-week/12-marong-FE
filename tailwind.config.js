/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#F9A8B4",
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
