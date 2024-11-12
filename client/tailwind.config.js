module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta según tu estructura de carpetas
  ],
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
          DEFAULT: "#4F46E5", // Azul suave
          light: "#6366F1", // Azul claro para hover
          dark: "#4338CA", // Azul oscuro para hover
        },
        danger: {
          DEFAULT: "#EF4444", // Rojo
          light: "#F87171", // Rojo claro para hover
          dark: "#B91C1C", // Rojo oscuro para hover
        },
      },
      backgroundImage: (theme) => ({
        "gradient-comandanteN":
          "linear-gradient(to right, #190329 0%, #2D0329 61.7%, #420229 100%)",
      }),
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        onest: ["Onest", "sans-serif"],
      },
    },
  },
  plugins: [],
};
