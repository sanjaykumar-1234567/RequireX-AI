/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07070B',
        surface: {
          DEFAULT: '#0F0F18',
          hover: '#181826',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(138, 43, 226, 0.08)'
        },
        neon: {
          violet: '#8A2BE2',
          'violet-dark': '#6B21A8',
          'violet-light': '#C084FC',
          yellow: '#FFB800',
          'yellow-dark': '#B45309',
          'yellow-light': '#FDE047',
          blue: '#0066FF',
          'blue-dark': '#1E40AF',
          'blue-light': '#60A5FA',
          red: '#FF0055',
          'red-dark': '#991B1B',
          'red-light': '#F43F5E',
          cyan: '#00F0FF',
          emerald: '#10B981',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-violet': '0 0 25px rgba(138, 43, 226, 0.45), inset 0 0 15px rgba(138, 43, 226, 0.15)',
        'neon-yellow': '0 0 25px rgba(255, 184, 0, 0.45), inset 0 0 15px rgba(255, 184, 0, 0.15)',
        'neon-blue': '0 0 25px rgba(0, 102, 255, 0.45), inset 0 0 15px rgba(0, 102, 255, 0.15)',
        'neon-red': '0 0 25px rgba(255, 0, 85, 0.45), inset 0 0 15px rgba(255, 0, 85, 0.15)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.15)',
        'neon-emerald': '0 0 25px rgba(16, 185, 129, 0.4), inset 0 0 12px rgba(16, 185, 129, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(138,43,226,0.2) 0%, rgba(0,102,255,0.2) 35%, rgba(255,0,85,0.15) 70%, rgba(7,7,11,1) 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #8A2BE2 0%, #0066FF 33%, #FF0055 66%, #FFB800 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
