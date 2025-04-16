# EIOS - Единая Информационная Образовательная Среда

🔗 Ссылка на ресурс: https://eios-brown.vercel.app/

## 1. Краткое описание проекта

- EIOS — это веб-приложение для образовательных целей, построенное на Vue 3 + Vite.
- Используются Tailwind CSS для стилей, ESLint для контроля качества кода.
- Поддержка темной/светлой темы с сохранением выбора в localStorage.

## 2. Начало работы

### Установка и запуск

```
git clone https://github.com/DANTES0/EIOS.git
npm install
npm run dev
```

### Сборка для production

```
npm run build
```

## 3. Написание компонентов

- Проект использует строгие правила линтинга. Ошибки подсвечиваются в IDE (рекомендуется VSCode + Volar).
- Tailwind CSS это основной инструмент стилизации. Избегайте написания кастомного CSS, если можно использовать утилиты Tailwind.
- Дублирующийся код выносите в переиспользуемые компоненты

## 4. Адаптация компонентов

В конфиге `tailwind.config.js` прописаны брейкпоинты

```
screens: {
            mobile: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
```

Поскольку используется TailWind, то применяются они в классах

```
    <div class="mobile:text-[10px] desktop:text-[22px]">
        ...
    </div>
```

Желательно не использовать css написание, но если без прямого указания медиазапросов не получится, то ладно

Сами медиа запросы прописывались по следующим брейкпоинтам

```
@media (min-width: 1024px) {}
@media (min-width: 1279px) {}
@media (min-width: 1440px) {}
@media (min-width: 1920px) {}
@media (min-width: 1921px) {}
```

## 5. Тёмная/Светлая тема на сайте

- При первом посещении тема определяется по настройкам ОС пользователя
- После переключения темы (через шестерёнку в навигации) выбор сохраняется в `localStorage`
- Тема меняется с помощью TailWind, поэтому компоненты пишем преимущественно с помощью него

### Интеграция с Tailwind

Добавляйте классы с префиксом `dark:` для темной темы:

```
    <div class="bg-white dark:bg-[#1f1f1f] wrap">
        ...
    </div>
```

В тёмной теме корневому тегу `html` добавляется класс `dark`.

## 6. Технологии и ссылки

### Основной стек

- JavaScript
- Vue 3 + Vite
- Tailwind CSS
- ESLint
- Prettier
- PrimeVue

## 7. IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items/?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items/?itemName=esbenp.prettier-vscode)
- [Vue - Official](https://marketplace.visualstudio.com/items/?itemName=Vue.volar)

## 8. Полезные материалы

- [Официальная документация Vue 3](https://vuejs.org/)
- [Single File Component](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [ESLint правила для Vue](https://eslint.vuejs.org/rules/)
- [Vue Style Guide](https://v3.ru.vuejs.org/ru/style-guide/)
- [Tailwind: Адаптивный дизайн](https://tailwindcss.ru/docs/responsive-design/)
- [Tailwind: Темный режим](https://tailwindcss.ru/docs/dark-mode/)
