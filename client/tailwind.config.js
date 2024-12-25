export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        DEFAULT: 'hsl(var(--primary))',
        light: '#6870C5',
        dark: '#0B0215',
        foreground: 'hsl(var(--primary-foreground))',
        danger: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#B91C1C',
        },
        tokyoNight: {
          bg: '#1a1b26',
          primary: '#7aa2f7',
          secondary: '#bb9af7',
          accent: '#f7768e',
          text: '#c0caf5',
          inputBg: '#414868',
          buttonPrimary: '#7aa2f7',
          buttonSecondary: '#3b4261',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
        },
      },
    },
  },
  plugins: [],
};