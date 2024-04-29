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
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000",
      gray: "#808080",
      grey: "#808080",
      orange: "#ffa500",
      transparent: "transparent",
      current: "currentColor",
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
