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
          150: '#F0DCC8',  // Enhanced light terracotta for better hover
          200: '#E8C4A6',  // Light terracotta border
          300: '#D9A076',  // Medium-light terracotta
          400: '#CA8D61',  // Medium terracotta
          500: '#C17E5A',  // Natural clay/earth tone (primary)
          600: '#A66B47',  // Deeper earth tone
          700: '#8B5A3C',  // Dark terracotta
          800: '#6B4429'   // Very dark terracotta for high contrast text
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
        'warmGold': '#D4A574', // More muted, natural gold tone
        // Quantum-Nature Color System
        'quantum': {
          forest: '#1a3d2e',   // Deep forest green for luxury depth
          sage: '#4a6741',     // Enhanced sage with quantum undertones
          energy: '#6b8e5a',   // Vibrant sage for energy fields
          plasma: '#7dd3c0',   // Subtle cyan for quantum tech effects
          neural: '#f8faf9',   // Cool-tinted white
          gold: '#7a6640',     // WCAG AA compliant quantum gold
          glow: '#50C878'      // Energy green for glow effects
        },
        'flow': {
          50: '#f0f9f4',    // Lightest quantum healing
          100: '#dcf2e3',   // Light energy field
          200: '#b8e5c8',   // Soft quantum glow
          300: '#8fd5a6',   // Medium quantum energy
          400: '#5fbf81',   // Vibrant healing frequency
          500: '#3da55f',   // Core healing frequency
          600: '#2d8749',   // Deep quantum energy
          700: '#256d3b',   // Quantum depth
          800: '#1f5530',   // Dark healing energy
          900: '#1a4729'    // Deepest forest quantum
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'quantum-glow': '0 0 20px rgba(107, 142, 90, 0.3), 0 0 40px rgba(107, 142, 90, 0.1)',
      },
      animation: {
        'quantum-pulse': 'quantum-pulse 3s ease-in-out infinite',
        'energy-flow': 'energy-flow 4s ease-in-out infinite',
      },
      keyframes: {
        'quantum-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'energy-flow': {
          '0%, 100%': { transform: 'translateX(0) scale(1)' },
          '50%': { transform: 'translateX(10px) scale(1.02)' },
        },
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