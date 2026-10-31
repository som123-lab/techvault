/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'] },
    colors: { ink: '#101827', muted: '#64748b', line: '#e8edf3', brand: '#635bff', mint: '#d9f7eb' },
    boxShadow: { soft: '0 12px 40px rgba(16,24,39,.07)' }
  }},
  plugins: []
}