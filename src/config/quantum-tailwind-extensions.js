// Quantum-Nature Tailwind Extensions
// To be merged into tailwind.config.js

const quantumAnimations = {
  'quantum-float': 'quantum-float 6s ease-in-out infinite',
  'quantum-pulse': 'quantum-pulse 4s ease-in-out infinite',
  'quantum-flow': 'quantum-flow 8s linear infinite',
  'particle-drift': 'particle-drift 12s linear infinite',
  'energy-ripple': 'energy-ripple 3s ease-out infinite',
  'neural-glow': 'neural-glow 2s ease-in-out infinite alternate',
};

const quantumKeyframes = {
  'quantum-float': {
    '0%, 100%': { transform: 'translateY(0px) scale(1)' },
    '50%': { transform: 'translateY(-12px) scale(1.05)' },
  },
  'quantum-pulse': {
    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
    '50%': { opacity: '0.8', transform: 'scale(1.1)' },
  },
  'quantum-flow': {
    '0%': { transform: 'translateX(-100%) rotate(0deg)' },
    '100%': { transform: 'translateX(100vw) rotate(360deg)' },
  },
  'particle-drift': {
    '0%': { transform: 'translate(0, 100vh) scale(0)' },
    '10%': { transform: 'translate(10px, 90vh) scale(1)' },
    '90%': { transform: 'translate(-10px, 10vh) scale(1)' },
    '100%': { transform: 'translate(0, 0) scale(0)' },
  },
  'energy-ripple': {
    '0%': { transform: 'scale(0.8)', opacity: '1' },
    '100%': { transform: 'scale(1.4)', opacity: '0' },
  },
  'neural-glow': {
    '0%': { boxShadow: '0 0 5px currentColor' },
    '100%': { boxShadow: '0 0 25px currentColor, 0 0 35px currentColor' },
  },
};

const quantumUtilities = {
  '.quantum-orb': {
    background: 'radial-gradient(circle at 30% 40%, rgba(107, 142, 90, 0.6), rgba(125, 211, 192, 0.3), transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(1px)',
    willChange: 'transform, opacity',
  },
  '.quantum-particle': {
    background: 'radial-gradient(circle, rgba(125, 211, 192, 0.8), transparent 60%)',
    borderRadius: '50%',
    filter: 'blur(0.5px)',
    willChange: 'transform',
  },
  '.quantum-energy-field': {
    background: 'conic-gradient(from 0deg at 50% 50%, transparent, rgba(107, 142, 90, 0.1), transparent)',
    filter: 'blur(2px)',
    mixBlendMode: 'multiply',
  },
  '.quantum-neural-glow': {
    background: 'radial-gradient(ellipse at center, rgba(248, 250, 249, 0.1), transparent 70%)',
    filter: 'blur(3px)',
  },
  '.gpu-accelerated': {
    transform: 'translateZ(0)',
    willChange: 'transform, opacity',
  },
  '.contain-layout': {
    contain: 'layout style paint',
  },
};

// Performance-optimized gradient utilities
const quantumGradients = {
  'quantum-bg-primary': 'linear-gradient(135deg, #1a3d2e 0%, #4a6741 30%, #6b8e5a 70%, #7dd3c0 100%)',
  'quantum-bg-secondary': 'radial-gradient(ellipse at top, #f8faf9 0%, #dcf2e3 50%, #b8e5c8 100%)',
  'quantum-bg-energy': 'conic-gradient(from 45deg, #4a6741, #6b8e5a, #7dd3c0, #4a6741)',
  'quantum-text-gradient': 'linear-gradient(135deg, #1a3d2e 0%, #4a6741 50%, #6b8e5a 100%)',
  'quantum-glow-gradient': 'radial-gradient(circle, rgba(125, 211, 192, 0.4), transparent 70%)',
};

module.exports = {
  quantumAnimations,
  quantumKeyframes,
  quantumUtilities,
  quantumGradients,
};