module.exports = {
  purge: [
    "./src/**/*.vue",
    "./public/**/*.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'footer': "url('/images/business\d.png')",
        'login': "url('/images/loginBackground.png')"
       })
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'first'],
      textColor: ['active'],
      lineClamp: ["hover"],
      height: ["hover"],
      padding: ["hover"],
      gridColumn: ["hover"],
      gridTemplateColumns: ['hover'],
      zIndex: ['hover'],
      position: ['group-hover'],
      inset: ['group-hover'],
    },
    display: ["hover","group-hover"]
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
