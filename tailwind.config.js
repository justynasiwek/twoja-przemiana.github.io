/** Konfiguracja Tailwind dla twoja-przemiana.pl
 *  Przebudowa CSS po zmianach w HTML:  npx tailwindcss -i css/input.css -o css/tailwind.css --minify
 */
module.exports = {
  content: ["./*.html", "./blog/*.html", "./blog/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
