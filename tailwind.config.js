module.exports = {
  purge: ["./src/**/*.vue", "./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "page-404": "url('/images/page404.jpg')",
        cancel: "url('/images/cancel.jpg')",
        successful: "url('/images/successful.jpg')",
      }),
      screens: {
        portrait: { raw: "(orientation: portrait)" },
        // => @media (orientation: portrait) { ... }
      },
      height: {
        phoneHeight: "550px",
      },
      width: {
        miniTablet: "700px",
      },
      minWidth: {
        iphone: "550px",
        miniTablet: "700px",
        tablet: "800px",
      },
      minHeight: {
        phoneHeight: "500px",
      },
      maxHeight: {
        dropdown: "500px",
        itemList: "860px",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "16": "repeat(16, minmax(0, 1fr))",

        //list addtocart layout on phone screen
        //  'layout-list-carts': '1000px minmax(360px, 1fr) 500px',

        //invoice layout on phone screen
        "layout-invoice": "700px minmax(700px, 1fr)",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        "8": "repeat(8, minmax(0, 1fr))",

        // Complex site-specific row configuration
        //  'layout': '100px minmax(100px, 1fr) 100px',
      },
      screens: {
        // for small phone screen
        iphone: "500px",
        tablet: "640px",
        Ipad: "800px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "first"],
      textColor: ["active"],
      height: ["hover"],
      padding: ["hover"],
      gridColumn: ["hover"],
      gridTemplateColumns: ["hover"],
      zIndex: ["hover"],
      position: ["group-hover"],
      inset: ["group-hover"],
      scale: ["hover", "group-hover"],
      rotate: ["active", "active", "group-hover"],
    },
    ringOffsetColor: ["hover", "active", "focus"],
    scale: ["active", "group-hover", "focus"],
    display: ["hover", "group-hover"],
  },
  plugins: [],
};
