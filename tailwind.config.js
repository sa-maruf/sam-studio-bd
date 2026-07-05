/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0F",
        surface: "#15151D",
        surface2: "#1D1D27",
        gold: "#E8B23D",
        marquee: "#D64545",
        mist: "#9C9CA8",
        paper: "#F5F3EF",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "film-strip":
          "repeating-linear-gradient(90deg, #0B0B0F 0 14px, transparent 14px 28px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(232,178,61,0.15), 0 8px 30px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
}
