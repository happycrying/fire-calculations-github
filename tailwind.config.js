/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-select/dist/index.esm.js",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'body': ['Montserrat']
    }, extend: {
      fontWeight: {
        'extra': 700
      },
    }, colors: {
      base: "#f03023",
      indigo: "#5c6ac4",
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000",
      green: "#00ff00",
      blue: "#0000ff",
      yellow: "#ffff00",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      gray: "#808080",
      grey: "#808080",
      dark: "#000080",
      light: "#c0c0c0",
      orange: "#ffa500",
      pink: "#ffc0cb",
      purple: "#800080",
      violet: "#800080",
      brown: "#a52a2a",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      teal: "#008080",
      transparent: "transparent",
      current: "currentColor",
    },

    container: {
      center: true, padding: {
        DEFAULT: "1rem", sm: "0rem",
      }, screens: {
        sm: "640px", md: "768px", lg: "1024px", xl: "1280px",
      },
    }, fontSize: {
      'xs': '0.65rem',
      sm: "0.75rem",
      m: "0.875rem",
      base: "0.875rem",
      md: "1rem",
      l: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.50rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    }, screens: {
      xs: "420px", // => @media (min-width: 420px) { ... }
      sm: "640px", // => @media (min-width: 640px) { ... }
      md: "768px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1280px", // => @media (min-width: 1280px) { ... }
      "2xl": "1536px", // => @media (min-width: 1536px) { ... }
      "3xl": "2200px"
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
