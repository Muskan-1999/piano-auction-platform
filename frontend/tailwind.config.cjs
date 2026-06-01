module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        luxury: {
          50: '#f9f7fb',
          100: '#efe9fb',
          200: '#e0d0fa',
          300: '#c2a6f6',
          400: '#9b6ef0',
          500: '#7a3de6',
          600: '#5e2bbf',
          700: '#441f8f',
          800: '#2e145f',
          900: '#1a0b34',
        },
        accent: '#7a3de6',
        muted: '#6b6375',
        surface: '#ffffff',
        border: '#e9e7ef',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Georgia', 'serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px rgba(17, 12, 38, 0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
