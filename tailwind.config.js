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
          50: '#FAF7F5',   // Very light terracotta
          100: '#F5E6D8',  // Light terracotta background
          200: '#E8C4A6',  // Light terracotta border
          300: '#D9A076',  // Medium-light terracotta
          400: '#CA8D61',  // Medium terracotta
          500: '#C17E5A',  // Natural clay/earth tone (primary)
          600: '#A66B47',  // Deeper earth tone
          700: '#8B5A3C'   // Dark terracotta
        },
        'slate': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        },
        'amber': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },
        'gold': '#D4A574',     // Alias for warmGold
        'black': '#000000',
        'white': '#FFFFFF',
        'cream': '#F5F5DC',
        'sage': {
          50: '#F7F8F7',   // Very light sage
          100: '#EEF1EE',  // Light sage background
          200: '#DCE3DB',  // Light sage border
          300: '#B8C7B6',  // Medium-light sage
          400: '#9DB19B',  // Medium sage
          500: '#8FA68E',  // Existing sage
          600: '#7A9178',  // Deeper sage
          700: '#657D63'   // Dark sage
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