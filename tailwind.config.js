/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      borderRadius: {
        'card': '16px',
        'btn': '10px',
      },
      animation: {
        'slide-in': 'slideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        slideIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(12px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
  plugins: [],
}