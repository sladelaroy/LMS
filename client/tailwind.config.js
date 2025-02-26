/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".index.html",
    "./src/**/*.{js,jsx,ts,tsx}" // Ensures Tailwind scans all components
  ],
  theme: {
    extend: {
      fontSize: {
        "course-details-leading-small": ["26px", "36px"],
        "course-details-leading-large": ["36px", "44px"],
        "home-leading-small": ["28px", "34px"],
        "home-leading-large": ["48px", "56px"],
        "default": ['15px', '21px']
      }
    }
  },
  plugins: []
};
