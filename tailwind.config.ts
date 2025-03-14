import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        native: {
          100: "#f2f2f2",
          700: "#696969",
          900: "#1b1b1b"
        }
      }
    },
  },
  plugins: [],
}
export default config
