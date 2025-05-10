/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#E6F8FF',
          100: '#CCF1FF',
          200: '#99E3FF',
          300: '#66D4FF',
          400: '#33C6FF',
          500: '#00B8FF',
          600: '#0093CC',
          700: '#006E99',
          800: '#004A66',
          900: '#002533',
        },
        // Secondary colors (purples)
        secondary: {
          50: '#F2E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#8000FF',
          600: '#6600CC',
          700: '#4D0099',
          800: '#330066',
          900: '#1A0033',
        },
        // Accent (neon green/cyan)
        accent: {
          50: '#E6FFF9',
          100: '#CCFFF2',
          200: '#99FFE6',
          300: '#66FFD9',
          400: '#33FFCC',
          500: '#00FFC0',
          600: '#00CC99',
          700: '#009973',
          800: '#00664D',
          900: '#003326',
        },
        // Success colors
        success: {
          50: '#E6FFF0',
          100: '#CCFFE0',
          200: '#99FFC2',
          300: '#66FFA3',
          400: '#33FF85',
          500: '#00FF66',
          600: '#00CC52',
          700: '#00993D',
          800: '#006629',
          900: '#003314',
        },
        // Warning colors
        warning: {
          50: '#FFF9E6',
          100: '#FFF2CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#FFC000',
          600: '#CC9900',
          700: '#997300',
          800: '#664D00',
          900: '#332600',
        },
        // Error colors
        error: {
          50: '#FFEBEB',
          100: '#FFD6D6',
          200: '#FFADAD',
          300: '#FF8585',
          400: '#FF5C5C',
          500: '#FF3333',
          600: '#CC2929',
          700: '#991F1F',
          800: '#661414',
          900: '#330A0A',
        },
        // Background colors
        background: {
          dark: '#0F172A',
          card: 'rgba(16, 24, 39, 0.8)',
          light: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        glow: 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 245, 255, 0.7)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.9)' },
        },
      },
    },
  },
  plugins: [],
};