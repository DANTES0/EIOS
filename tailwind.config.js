/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        screens: { mobile: '640px', laptop: '1024px', desktop: '1920px' },
        extend: {},
    },
    plugins: [],
    darkMode: 'selector',
};
//ИСПОЛЬЗОВАНИЕ ТЕМЫ
//localStorage.theme = 'dark' - Включение тюмного режима
//localStorage.removeItem('theme') - Убрать тему и использовать предпочтения OC
