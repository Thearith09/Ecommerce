module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      lineClamp: ["hover"],
      height: ["hover"]
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
