## Написание компонентов

-   Поскольку в данном проекте установлен ESLint, то компоненты необходимо стараться писать по правилам, он подскажет;
-   Стилизовать компоненты преимущественно с помощью TailWind, поскольку адаптировать и менять темы удобнее с ним, да и просто немного комфортнее;
-   Главное композировать потворяющийся код в компонентах т.е оборачивать в ещё одну компоненту часто повторяющиеся компонентные блоки;

## Адаптация компонентов

-   В конфиге TailWind прописаны ключевые точки, которы зависят от ширины экрана, значения можно поменять;

```
screens: {
            mobile: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
```

-   Поскольку используется TailWind, то применяются они в классах

```
    <div class="mobile:text-[10px] desktop:text-[22px]">
        ...
    </div>
```

-   Желательно не использовать css написание, но если без прямого указания медиазапросов не получится, то ладно

## Руководство по темам сайта

-   Пока тема меняется по нажатию на шестерёнку в навигационной панели
-   При первом запуске сайта - тема будет соответствовать теме OC, но когда нажмете на шестерёнку тема будет браться из локального хранилища
-   Тема меняется с помощью TailWind, поэтому компоненты пишем преимущественно с помощью него

**Пример использования**

```
    <div class="bg-white dark:bg-[#1f1f1f] wrap">
        ...
    </div>
```

В данном случае при испоьзовании темной темы необходимо написать селектор dark:, при использовании светлой темы используем подход без селектора

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## EsLint Docs

https://eslint.org/docs/latest/rules/
https://eslint.style/packages/js
https://eslint.vuejs.org/rules/#deprecated

## Vue Style Guide

https://v3.ru.vuejs.org/ru/style-guide/

## TailWind

https://tailwindcss.com/
https://tailwindcss.ru/docs/responsive-design/?ysclid=lzfdvxahaw128163659
https://tailwindcss.ru/docs/dark-mode/?ysclid=lzfcdi53bp706594357
