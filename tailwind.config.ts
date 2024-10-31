import type { Config } from 'tailwindcss';
import tailwindcssForm from '@tailwindcss/forms';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/modules/**/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [tailwindcssForm],
};
export default config;
