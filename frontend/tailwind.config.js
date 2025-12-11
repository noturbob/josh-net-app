/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: We point to our new src folder structure
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950
        surface: '#18181b',    // Zinc 900
        primary: '#6366f1',    // Indigo 500 (Brand)
        secondary: '#14b8a6',  // Teal 500 (Student)
        accent: '#f59e0b',     // Amber 500 (Faculty)
        danger: '#f43f5e',     // Rose 500 (Admin/Alumni)
        muted: '#71717a',      // Zinc 500
        border: '#27272a',     // Zinc 800
      }
    },
  },
  plugins: [],
}