module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Tailwind 적용할 파일 경로
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
}
