module.exports = {
  purge: [
    "./src/**/*.vue",
    "./public/**/*.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       }),
       screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        // => @media (orientation: portrait) { ... }
      },
      gridTemplateColumns: {
        // Simple 16 column grid
       '16': 'repeat(16, minmax(0, 1fr))',

        
        //list addtocart layout on phone screen
      //  'layout-list-carts': '1000px minmax(360px, 1fr) 500px',

       //invoice layout on phone screen
       'layout-invoice': '700px minmax(700px, 1fr)',
      },
      gridTemplateRows: {
        // Simple 8 row grid
       '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
      //  'layout': '100px minmax(100px, 1fr) 100px',
      },
      screens: {
        // for small phone screen
        '3sm': '450px',
        '2sm': '600px',
        'sm': '640px',
        'asm': '680px',
        'md': '768px',
        'amd': '850px',
        'lg': '1024px',
        'alg': '1120px',
        'xl': '1280px',
        '2xl': '1536px',
      },
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
