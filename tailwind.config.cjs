/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#07010d',
        panel: '#12071b',
        ink: '#f4eefb',
        muted: '#b7a9c7',
        line: 'rgba(255,255,255,0.1)',
        glow: '#b014ff',
        lilac: '#ddbbf1',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(221, 187, 241, 0.18), 0 30px 80px rgba(176, 20, 255, 0.24)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at 50% -10%, rgba(176,20,255,0.38), transparent 45%), radial-gradient(circle at 85% 0%, rgba(255,255,255,0.08), transparent 18%), linear-gradient(180deg, #14051d 0%, #07010d 42%, #050109 100%)',
      },
      borderRadius: {
        pill: '999px',
        panel: '32px',
      },
    },
  },
  plugins: [],
}
