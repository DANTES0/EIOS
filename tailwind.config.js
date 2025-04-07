/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        screens: { mobile: '640px', laptop: '1024px', desktop: '1920px' },
        extend: {
            colors: {
                'brand-blue': '#1E66F5',
                'dp-primary': '#1E66F5',
                'dp-primary-dark': '#3B82F6',
                'dp-bg': '#FFFFFF',
                'dp-bg-dark': '#1F1F1F',
                'dp-text': '#0C2340',
                'dp-text-dark': '#CCCCCC',
                'voen-blue': '#0077C8',
                'custom-light-bg': '#cccccc',
                'custom-dark-bg': '#181818',
              }
        },
    },
    plugins: [],
    darkMode: 'class',
};
//ИСПОЛЬЗОВАНИЕ ТЕМЫ
//localStorage.theme = 'dark' - Включение тюмного режима
//localStorage.removeItem('theme') - Убрать тему и использовать предпочтения OC
