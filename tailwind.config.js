/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Surface ladder for the FarSend landing page. Only these steps are
        // allowed as backgrounds, darkest to lightest.
        surface: {
          0: '#000000',
          1: '#181818',
          2: '#1F1F1F',
          3: '#272727',
          4: '#313131',
        },
        // Single accent. Desaturated patina green, deliberately kept away from
        // the neon green that reads as a generated page.
        accent: {
          DEFAULT: '#5FBFA0',
          soft: '#7ED3B5',
        },
        danger: '#EC7C64',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        // Base curve for every transition on the landing page.
        settle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
