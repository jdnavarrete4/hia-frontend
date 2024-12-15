/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 50s linear infinite',
      },
      boxShadow: {
        'custom': '0px 20px 20px 0px rgba(0, 0, 0, 0.04)',
      },
      fontSize: {
        'tiny': '8px',
      },
    },
  },
  plugins: [],
}

