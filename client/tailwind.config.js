module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        comandanteN: {
          1: "#59393F",
          2: "#400330",
          3: "#40043C",
          4: "#260324",
          5: "#0D0626",
        },
        lightTheme: {
          background: "#f9f9f9",
          card: "#ffffff",
          text: "#333333",
          subtitle: "#555555",
          shadow: "rgba(0, 0, 0, 0.05)",
        },
        primary: {
          DEFAULT: "#260938",
          light: "#6870C5",
          dark: "#0B0215",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#B91C1C",
        },
        tokyoNight: {
          bg: "#1a1b26",
          primary: "#7aa2f7",
          secondary: "#bb9af7",
          accent: "#f7768e",
          text: "#c0caf5",
          inputBg: "#414868",
          buttonPrimary: "#7aa2f7",
          buttonSecondary: "#3b4261",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        onest: ["Onest", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "0.99",
            filter: "brightness(0.95)",
          },
          "20%, 24%, 55%": { opacity: "0.4", filter: "brightness(1)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        flicker: "flicker 3s infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
