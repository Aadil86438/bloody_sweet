/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: '#6B1D2A',
          'burgundy-dark': '#4A1420',
          cherry: '#8B2E3B',
          'cherry-light': '#A84455',
          cream: '#FFF8F0',
          ivory: '#FFFDF8',
          cocoa: '#3D2B1F',
          'cocoa-light': '#5C4033',
          blush: '#F5E1E4',
          rose: '#E8C4C8',
          gold: '#C5A55A',
          'gold-light': '#D4B96E',
        },
        admin: {
          bg: '#F7F5F2',
          card: '#FFFFFF',
          border: '#E8E2DB',
          text: '#2D2A26',
          'text-secondary': '#6B665E',
          accent: '#6B1D2A',
          success: '#2D7D46',
          warning: '#C47F17',
          danger: '#C53030',
          info: '#2B6CB0',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 6vw, 5rem)',
        'hero-sub': 'clamp(1rem, 2vw, 1.5rem)',
        'section': 'clamp(1.75rem, 4vw, 3rem)',
        'card-title': 'clamp(1rem, 1.5vw, 1.25rem)',
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 6rem)',
        'section-sm': 'clamp(2rem, 5vw, 4rem)',
      },
      maxWidth: {
        'site': '1400px',
        'content': '1200px',
        'narrow': '800px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'elevated': '0 10px 30px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
        'modal': '0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'brand': '0.5rem',
        'brand-lg': '0.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
