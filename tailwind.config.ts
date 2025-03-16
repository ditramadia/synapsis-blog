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
        main: {
          500: "#00a0dd"
        },
        native: {
          100: "#fcfcfc",
          400: "#94a3b8",
          900: "#1b1b1b"
        }
      }
    },
  },
  plugins: [],
}
export default config
