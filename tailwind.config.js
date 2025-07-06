/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'terracotta': {
          100: '#F5E6D8', // Light terracotta background
          200: '#E8C4A6', // Light terracotta border
          300: '#D9A076', // Medium-light terracotta
          400: '#CA8D61', // Medium terracotta
          500: '#C17E5A', // Natural clay/earth tone (primary)
          600: '#A66B47', // Deeper earth tone
          700: '#8B5A3C'  // Dark terracotta
        },
        'slate': {
          600: '#708090', 
          700: '#5F6F7F'
        },
        'black': '#000000',
        'white': '#FFFFFF',
        'cream': '#F5F5DC',
        'sage': {
          500: '#8FA68E', // Existing sage
          600: '#7A9178'  // Deeper sage
        },
        'warmGold': '#D4A574' // More muted, natural gold tone
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'sans': ['var(--font-open-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}