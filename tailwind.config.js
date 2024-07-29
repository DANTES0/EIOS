/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        screens: {
            mobile: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
        extend: {},
    },
    plugins: [],
};
