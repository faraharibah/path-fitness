import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ios: { blue: '#007AFF', green: '#34C759', orange: '#FF9500', red: '#FF3B30', indigo: '#5856D6', gray: '#8E8E93' } } } }, plugins: [] };
export default config;
