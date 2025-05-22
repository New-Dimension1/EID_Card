/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: { 
       colors: {
        olive: '#6D8440',
        olive2 : "#849F4D", 
        lightolive : "#A2BA71",
        navy: '#003366',
        monsterBlue : "#336699",
        lightblue : "#7D97B3",
      },
      fontFamily: {
        alexandria: ['var(--font-alexandria)'],
     
      },

    
    },
  },
  plugins: [],
}

