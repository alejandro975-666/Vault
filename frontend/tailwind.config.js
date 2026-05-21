module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          black: '#0a0c0a',
          dark: '#111410',
          card: '#1a1f1a',
          green: '#39ff14',
          'green-hover': '#2bc810',
          'green-dark': '#1a7a0a',
          text: '#c8f0c8',
          muted: '#7ab87a',
          hint: '#3d5c3d',
          error: '#ff4444',
          warning: '#ffaa00',
        }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
