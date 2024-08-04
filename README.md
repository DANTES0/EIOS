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

## Руководство по темам сайта

-   Пока тема меняется по нажатию на шестерёнку в навигационной панели
-   При первом запуске сайта - тема будет соответствовать теме OC, но когда нажмете на шестерёнку тема будет браться из локального хранилища
-   Тема меняется с помощью TailWind, поэтому компоненты пишем преимущественно с помощью него

-   Ссылка на доку https://tailwindcss.ru/docs/dark-mode/?ysclid=lzfcdi53bp706594357

**Пример использования**

```
    <div class="bg-white dark:bg-[#1f1f1f] wrap">
    ...
    </div>

```

В данном случае при испоьзовании темной темы необходимо написать селектор dark:, при использовании светлой темы используем подход без селектора
