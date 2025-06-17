/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Pink: F9A8B4
          pink: "#967E76",
          brown_dark: "#7C5B4F",
          background: "#FFFFFF",
          brown_light: "#c7b199"
        },
        marong: {
          brown_dark: "#8D5A2E"
        }
      },
      fontFamily: {
        marong: ["marong"],
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
