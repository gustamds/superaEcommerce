/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'smSlider' : {'min' : '0px' ,  'max' : '660px'},
      'mdSlider' : {'min': '661px' , 'max' : '920px'},
      'lgSlider' : {'min': '921px' , 'max' : '1500px'},
      'headerMobile' : {'min' : '0px' , 'max' : '600px'},
    },
    extend: {},
  },
  plugins: [],
}