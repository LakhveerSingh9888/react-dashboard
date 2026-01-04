/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  // Theme customization is now done in CSS using @theme directive
  // This config file is mainly for content paths, darkMode, and plugins
}
