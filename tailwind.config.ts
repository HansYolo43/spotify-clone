import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
}


//my tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       color: {
//         spotify:  '#1e40af',
//       },
//     },
//   },
// };

export default config