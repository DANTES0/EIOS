# Детальное описание компонентов EIOS

## Содержание
1. [Основные компоненты](#основные-компоненты)
2. [Компоненты страниц](#компоненты-страниц)
3. [UX компоненты](#ux-компоненты)
4. [Общие компоненты](#общие-компоненты)
5. [Иконки](#иконки)
6. [Руководство по разработке](#руководство-по-разработке)
7. [Паттерны и практики](#паттерны-и-практики)
8. [Взаимодействие компонентов](#взаимодействие-компонентов)
9. [Примеры использования](#примеры-использования)

## Основные компоненты

### Header.vue
**Расположение**: `src/components/Header.vue`

**Назначение**: Основной компонент навигации приложения

**Функциональность**:
- Навигационное меню с иконками
- Переключение темы (светлая/темная)
- Управление авторизацией
- Быстрые ссылки на внешние ресурсы (Мудл, почта и т.д.)

**Основные функции**:
```javascript
toggleAuthVisibility() // Управление видимостью окна авторизации
changeTheme() // Переключение между светлой и темной темами
```

**Стилизация**:
- Использование Tailwind CSS
- Поддержка темной темы
- Адаптивный дизайн
- Кастомные иконки

### Auth.vue
**Расположение**: `src/components/Auth.vue`

**Назначение**: Компонент авторизации пользователей

**Функциональность**:
- Форма входа с валидацией
- Интеграция с API авторизации
- Обработка ошибок
- Модальное окно

**Основные функции**:
```javascript
hideAuth(event) // Закрытие окна авторизации
authorize() // Процесс авторизации пользователя
```

**Стилизация**:
- Модальное окно с затемнением
- Анимации
- Валидация полей ввода
- Адаптивный дизайн

### Footer.vue
**Расположение**: `src/components/Footer.vue`

**Назначение**: Нижний колонтитул приложения

**Функциональность**:
- Контактная информация кафедры
- Ссылки на социальные сети
- Копирайт
- Дополнительная навигация

### Terminal.vue
**Расположение**: `src/components/Terminal.vue`

**Назначение**: Компонент терминала/консоли

**Функциональность**:
- Эмуляция терминала
- Выполнение команд
- Отображение результатов
- История команд
- Автодополнение

## Компоненты страниц

### PrepodavateliPageComponents

#### InputSearch.vue
**Расположение**: `src/components/PrepodavateliPageComponents/InputSearch.vue`

**Назначение**: Поиск преподавателей

**Функциональность**:
- Поиск по имени
- Автодополнение
- Форматирование имен
- Интеграция с API

**Основные функции**:
```javascript
getShortName(fullName) // Форматирование полного имени в сокращенное
fetchGroup() // Получение списка преподавателей
```

#### TeacherCard.vue
**Расположение**: `src/components/PrepodavateliPageComponents/TeacherCard.vue`

**Назначение**: Карточка преподавателя

**Функциональность**:
- Отображение основной информации
- Фото преподавателя
- Контактные данные
- Анимации при наведении

#### CourseDropdown.vue
**Расположение**: `src/components/PrepodavateliPageComponents/CourseDropdown.vue`

**Назначение**: Выпадающий список курсов

**Функциональность**:
- Выбор курса
- Фильтрация
- Адаптивный дизайн
- Поддержка темной темы

#### TeacherConsultations.vue
**Расположение**: `src/components/PrepodavateliPageComponents/TeacherConsultations.vue`

**Назначение**: Расписание консультаций преподавателя

**Функциональность**:
- Отображение времени консультаций
- Дни недели
- Аудитории
- Адаптивный дизайн

#### SearchPrepod.vue
**Расположение**: `src/components/PrepodavateliPageComponents/SearchPrepod.vue`

**Назначение**: Поиск преподавателей

**Функциональность**:
- Поиск по имени
- Фильтрация результатов
- Автодополнение
- Интеграция с API

### NewsPageComponents

#### NewsList.vue
**Расположение**: `src/components/NewsPageComponents/NewsList.vue`

**Назначение**: Список новостей

**Функциональность**:
- Пагинация
- Фильтрация
- Сортировка
- Адаптивный дизайн

#### NewsCard.vue
**Расположение**: `src/components/NewsPageComponents/NewsCard.vue`

**Назначение**: Карточка новости

**Функциональность**:
- Отображение превью
- Дата публикации
- Категория
- Анимации при наведении

#### NewsFilters.vue
**Расположение**: `src/components/NewsPageComponents/NewsFilters.vue`

**Назначение**: Фильтры новостей

**Функциональность**:
- Фильтрация по категориям
- Фильтрация по дате
- Поиск
- Сброс фильтров

#### VPagination.vue
**Расположение**: `src/components/NewsPageComponents/VPagination.vue`

**Назначение**: Компонент пагинации

**Функциональность**:
- Навигация по страницам
- Отображение текущей страницы
- Адаптивный дизайн
- Поддержка темной темы

#### NewsBlock.vue
**Расположение**: `src/components/NewsPageComponents/NewsBlock.vue`

**Назначение**: Блок новости

**Функциональность**:
- Отображение превью
- Дата публикации
- Категория
- Анимации при наведении

#### CustomCheckbox.vue
**Расположение**: `src/components/NewsPageComponents/CustomCheckbox.vue`

**Назначение**: Кастомный чекбокс

**Функциональность**:
- Визуальная индикация
- Анимации
- Адаптивный дизайн
- Поддержка темной темы

#### CustomPagination.vue
**Расположение**: `src/components/NewsPageComponents/CustomPagination.vue`

**Назначение**: Кастомная пагинация

**Функциональность**:
- Навигация по страницам
- Отображение текущей страницы
- Адаптивный дизайн
- Поддержка темной темы

### TimetablePageComponents

#### TimetableInput.vue
**Расположение**: `src/components/TimetablePageComponents/TimetableInput.vue`

**Назначение**: Ввод данных для расписания

**Функциональность**:
- Валидация ввода
- Автодополнение
- Форматирование данных
- Интеграция с API

#### TimetableDisplay.vue
**Расположение**: `src/components/TimetablePageComponents/TimetableDisplay.vue`

**Назначение**: Отображение расписания

**Функциональность**:
- Табличное представление
- Фильтрация по дням/неделям
- Экспорт в PDF
- Адаптивный дизайн

#### LessonsTimetable.vue
**Расположение**: `src/components/TimetablePageComponents/LessonsTimetable.vue`

**Назначение**: Расписание занятий

**Функциональность**:
- Табличное представление
- Фильтрация по группам
- Экспорт в PDF
- Адаптивный дизайн

#### LessonCell.vue
**Расположение**: `src/components/TimetablePageComponents/LessonCell.vue`

**Назначение**: Ячейка расписания

**Функциональность**:
- Отображение информации о занятии
- Преподаватель
- Аудитория
- Адаптивный дизайн

#### InputSearch.vue
**Расположение**: `src/components/TimetablePageComponents/InputSearch.vue`

**Назначение**: Поиск в расписании

**Функциональность**:
- Поиск по группам
- Фильтрация результатов
- Автодополнение
- Интеграция с API

### MainPageComponents

#### SectionTitle.vue
**Расположение**: `src/components/MainPageComponents/SectionTitle.vue`

**Назначение**: Компонент заголовка секции

**Функциональность**:
- Единый стиль заголовков
- Адаптивный дизайн
- Поддержка темной темы
- Анимации при появлении

#### TeachingStaffСarousel.vue
**Расположение**: `src/components/MainPageComponents/TeachingStaffСarousel.vue`

**Назначение**: Карусель преподавателей

**Функциональность**:
- Слайдер преподавателей
- Автоматическая прокрутка
- Управление через кнопки
- Адаптивный дизайн

#### TeachingStaffСarouselItem.vue
**Расположение**: `src/components/MainPageComponents/TeachingStaffСarouselItem.vue`

**Назначение**: Элемент карусели преподавателей

**Функциональность**:
- Отображение фото
- Информация о преподавателе
- Анимации при наведении
- Адаптивный дизайн

#### NumberColumn.vue
**Расположение**: `src/components/MainPageComponents/NumberColumn.vue`

**Назначение**: Колонка с числовыми показателями

**Функциональность**:
- Отображение статистики
- Анимации чисел
- Адаптивный дизайн
- Поддержка темной темы

#### CafedraInNumbers.vue
**Расположение**: `src/components/MainPageComponents/CafedraInNumbers.vue`

**Назначение**: Статистика кафедры

**Функциональность**:
- Отображение ключевых показателей
- Анимации
- Адаптивный дизайн
- Интерактивные элементы

#### PhotoGallery.vue
**Расположение**: `src/components/MainPageComponents/PhotoGallery.vue`

**Назначение**: Галерея фотографий

**Функциональность**:
- Слайдер фотографий
- Модальное окно для просмотра
- Адаптивный дизайн
- Оптимизация загрузки

#### NewsMain.vue
**Расположение**: `src/components/MainPageComponents/NewsMain.vue`

**Назначение**: Блок новостей на главной странице

**Функциональность**:
- Отображение последних новостей
- Пагинация
- Адаптивный дизайн
- Анимации

#### DropdownHeader.vue
**Расположение**: `src/components/MainPageComponents/DropdownHeader.vue`

**Назначение**: Выпадающее меню заголовка

**Функциональность**:
- Навигация по разделам
- Анимации
- Адаптивный дизайн
- Поддержка темной темы

#### TeachingStaff.vue
**Расположение**: `src/components/MainPageComponents/TeachingStaff.vue`

**Назначение**: Секция преподавателей

**Функциональность**:
- Отображение списка преподавателей
- Фильтрация
- Поиск
- Адаптивный дизайн

#### Cafedra.vue
**Расположение**: `src/components/MainPageComponents/Cafedra.vue`

**Назначение**: Секция кафедры

**Функциональность**:
- Отображение информации о кафедре
- Контактные данные
- Адаптивный дизайн
- Поддержка темной темы

#### News.vue
**Расположение**: `src/components/MainPageComponents/News.vue`

**Назначение**: Секция новостей

**Функциональность**:
- Отображение последних новостей
- Пагинация
- Фильтрация
- Адаптивный дизайн

#### CafedraText.vue
**Расположение**: `src/components/MainPageComponents/CafedraText.vue`

**Назначение**: Текстовый блок о кафедре

**Функциональность**:
- Отображение текста
- Форматирование
- Адаптивный дизайн
- Поддержка темной темы

### NewsContentPageComponents

#### NewsContentHeader.vue
**Расположение**: `src/components/NewsContentPageComponents/NewsContentHeader.vue`

**Назначение**: Заголовок страницы новости

**Функциональность**:
- Отображение заголовка
- Дата публикации
- Категория
- Адаптивный дизайн

#### NewsContentPageSlider.vue
**Расположение**: `src/components/NewsContentPageComponents/NewsContentPageSlider.vue`

**Назначение**: Слайдер изображений новости

**Функциональность**:
- Просмотр изображений
- Навигация
- Адаптивный дизайн
- Оптимизация загрузки

#### NewsContentBase.vue
**Расположение**: `src/components/NewsContentPageComponents/NewsContentBase.vue`

**Назначение**: Базовый компонент контента новости

**Функциональность**:
- Отображение текста
- Форматирование
- Вставка изображений
- Адаптивный дизайн

### AdminPageComponents

#### LeftAdminMenu.vue
**Расположение**: `src/components/AdminPageComponents/LeftAdminMenu.vue`

**Назначение**: Левое меню администратора

**Функциональность**:
- Навигация по разделам админки
- Подсветка активного раздела
- Адаптивный дизайн
- Поддержка темной темы

#### UserAdmin.vue
**Расположение**: `src/components/AdminPageComponents/UserAdmin.vue`

**Назначение**: Управление пользователями

**Функциональность**:
- Список пользователей
- Фильтрация
- Поиск
- Управление ролями

#### NewsAdmin.vue
**Расположение**: `src/components/AdminPageComponents/NewsAdmin.vue`

**Назначение**: Управление новостями

**Функциональность**:
- Список новостей
- Редактирование
- Удаление
- Добавление

#### NewsAdminAdd.vue
**Расположение**: `src/components/AdminPageComponents/NewsAdminAdd.vue`

**Назначение**: Добавление новости

**Функциональность**:
- Форма добавления
- Загрузка изображений
- Валидация
- Предпросмотр

#### NewsAdminEdit.vue
**Расположение**: `src/components/AdminPageComponents/NewsAdminEdit.vue`

**Назначение**: Редактирование новости

**Функциональность**:
- Форма редактирования
- Загрузка изображений
- Валидация
- Предпросмотр

#### ChangePhotoGallery.vue
**Расположение**: `src/components/AdminPageComponents/ChangePhotoGallery.vue`

**Назначение**: Управление галереей

**Функциональность**:
- Загрузка фотографий
- Удаление
- Сортировка
- Предпросмотр

#### VariousComponents

##### AdminKafedra.vue
**Расположение**: `src/components/AdminPageComponents/VariousComponents/AdminKafedra.vue`

**Назначение**: Управление информацией о кафедре

**Функциональность**:
- Редактирование информации
- Загрузка изображений
- Валидация
- Предпросмотр

##### KafedraListAdmin.vue
**Расположение**: `src/components/AdminPageComponents/VariousComponents/KafedraListAdmin.vue`

**Назначение**: Список кафедр в админке

**Функциональность**:
- Отображение списка
- Фильтрация
- Поиск
- Управление

#### AddUserStudentModalComponent.vue
**Расположение**: `src/components/AdminPageComponents/AddUserStudentModalComponent.vue`

**Назначение**: Модальное окно добавления студента

**Функциональность**:
- Форма добавления
- Валидация
- Загрузка данных
- Интеграция с API

#### TeachersChange.vue
**Расположение**: `src/components/AdminPageComponents/TeachersChange.vue`

**Назначение**: Управление преподавателями

**Функциональность**:
- Редактирование информации
- Удаление
- Добавление
- Интеграция с API

#### EditUserModalComponent.vue
**Расположение**: `src/components/AdminPageComponents/EditUserModalComponent.vue`

**Назначение**: Модальное окно редактирования пользователя

**Функциональность**:
- Форма редактирования
- Валидация
- Загрузка данных
- Интеграция с API

#### EditUserStudentModalComponent.vue
**Расположение**: `src/components/AdminPageComponents/EditUserStudentModalComponent.vue`

**Назначение**: Модальное окно редактирования студента

**Функциональность**:
- Форма редактирования
- Валидация
- Загрузка данных
- Интеграция с API

#### UsersAll.vue
**Расположение**: `src/components/AdminPageComponents/UsersAll.vue`

**Назначение**: Список всех пользователей

**Функциональность**:
- Отображение списка
- Фильтрация
- Поиск
- Управление ролями

#### UserStudents.vue
**Расположение**: `src/components/AdminPageComponents/UserStudents.vue`

**Назначение**: Управление студентами

**Функциональность**:
- Список студентов
- Фильтрация
- Поиск
- Управление данными

#### UserTeachers.vue
**Расположение**: `src/components/AdminPageComponents/UserTeachers.vue`

**Назначение**: Управление преподавателями

**Функциональность**:
- Список преподавателей
- Фильтрация
- Поиск
- Управление данными

#### AddUserModalComponent.vue
**Расположение**: `src/components/AdminPageComponents/AddUserModalComponent.vue`

**Назначение**: Модальное окно добавления пользователя

**Функциональность**:
- Форма добавления
- Валидация
- Загрузка данных
- Интеграция с API

## UX компоненты

### VInput.vue
**Расположение**: `src/components/UX/VInput.vue`

**Назначение**: Базовый компонент ввода

**Функциональность**:
- Валидация ввода
- Обработка ошибок
- Поддержка различных типов ввода
- Интеграция с формами

### VButton.vue
**Расположение**: `src/components/UX/VButton.vue`

**Назначение**: Базовый компонент кнопки

**Функциональность**:
- Различные варианты стилей
- Состояния (hover, active, disabled)
- Иконки
- Анимации

### VTimetableInput.vue
**Расположение**: `src/components/UX/VTimetableInput.vue`

**Назначение**: Компонент ввода для расписания

**Функциональность**:
- Валидация ввода
- Автодополнение
- Форматирование данных
- Интеграция с API

### CurrentWeekInfo.vue
**Расположение**: `src/components/UX/CurrentWeekInfo.vue`

**Назначение**: Отображение информации о текущей неделе

**Функциональность**:
- Определение текущей недели
- Отображение номера недели
- Индикация четности/нечетности
- Адаптивный дизайн

### CurrentWeekCheckbox.vue
**Расположение**: `src/components/UX/CurrentWeekCheckbox.vue`

**Назначение**: Переключатель текущей недели

**Функциональность**:
- Переключение между неделями
- Визуальная индикация
- Интеграция с расписанием
- Адаптивный дизайн

## Общие компоненты

### Tabs.vue
**Расположение**: `src/components/Tabs.vue`

**Назначение**: Компонент вкладок

**Функциональность**:
- Переключение между вкладками
- Анимации переключения
- Адаптивный дизайн
- Поддержка темной темы

### HeaderAnchor.vue
**Расположение**: `src/components/HeaderAnchor.vue`

**Назначение**: Компонент якорных ссылок

**Функциональность**:
- Навигация по странице
- Плавная прокрутка
- Подсветка активного раздела
- Адаптивный дизайн

## Иконки

### IconBase.vue
**Расположение**: `src/components/Icons/IconBase.vue`

**Назначение**: Базовый компонент для иконок

**Функциональность**:
- Единый стиль иконок
- Настройка размера
- Настройка цвета
- Поддержка темной темы

### Icon/
**Расположение**: `src/components/Icons/Icon/`

**Назначение**: Коллекция иконок приложения

**Функциональность**:
- Социальные сети
- Навигационные иконки
- Действия пользователя
- Статусные индикаторы

#### Социальные сети
- IconVk.vue - Иконка ВКонтакте
- IconTelegram.vue - Иконка Telegram
- IconMail.vue - Иконка электронной почты

#### Технологии
- IconTs.vue - Иконка TypeScript
- IconJs.vue - Иконка JavaScript
- IconPy.vue - Иконка Python
- IconHtml.vue - Иконка HTML
- IconCss.vue - Иконка CSS
- IconC.vue - Иконка C

#### Действия
- IconEdit.vue - Иконка редактирования
- IconAddImage.vue - Иконка добавления изображения
- IconDownArrow.vue - Иконка стрелки вниз
- IconTick.vue - Иконка галочки

#### Общие
- IconPhone.vue - Иконка телефона
- IconEducation.vue - Иконка образования

## Руководство по разработке

### 1. Общие принципы разработки

#### 1.1. Стиль кода
- Использование ESLint для соблюдения правил написания кода
- Следование Vue 3 Style Guide
- Использование `<script setup>` синтаксиса
- Компоненты должны иметь осмысленные, многословные имена

#### 1.2. Архитектура компонентов
- Композиция повторяющегося кода в отдельные компоненты
- Разделение компонентов по функциональности
- Использование Vuex для управления состоянием
- Использование composables для переиспользуемой логики

### 2. Стилизация

#### 2.1. Tailwind CSS
- Основной инструмент для стилизации компонентов
- Преимущества:
  - Удобная адаптация тем
  - Простота поддержки
  - Гибкость настройки

#### 2.2. Адаптивный дизайн
- Использование предустановленных брейкпоинтов:
  ```javascript
  screens: {
      mobile: '640px',
      laptop: '1024px',
      desktop: '1280px',
  }
  ```
- Пример использования:
  ```html
  <div class="mobile:text-[10px] desktop:text-[22px]">
      ...
  </div>
  ```

#### 2.3. Темная тема
- Автоматическое определение системной темы при первом запуске
- Переключение через локальное хранилище
- Синтаксис:
  ```html
  <div class="bg-white dark:bg-[#1f1f1f]">
      ...
  </div>
  ```

### 3. Структура проекта

#### 3.1. Основные компоненты
- Header.vue - навигационная панель с переключением темы
- Footer.vue - подвал сайта
- Auth.vue - компонент авторизации
- Terminal.vue - терминальный интерфейс

#### 3.2. Специализированные компоненты
- PrepodavateliPageComponents/ - компоненты страницы преподавателей
- NewsPageComponents/ - компоненты новостной ленты
- TimetablePageComponents/ - компоненты расписания
- NewsContentPageComponents/ - компоненты контента новостей
- MainPageComponents/ - компоненты главной страницы
- AdminPageComponents/ - компоненты админ-панели
- UX/ - компоненты пользовательского опыта
- Icons/ - иконки

### 4. Рекомендуемые инструменты
- VS Code + Volar
- TypeScript Vue Plugin
- ESLint
- Tailwind CSS

### 5. Дополнительные ресурсы
- [Vue 3 Documentation](https://v3.vuejs.org/)
- [ESLint Documentation](https://eslint.org/docs/latest/rules/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue Style Guide](https://v3.ru.vuejs.org/ru/style-guide/)

## Паттерны и практики

### 1. Композиция компонентов
- Использование слотов для гибкой композиции
- Передача данных через props
- Использование provide/inject для глубокой вложенности
- Компоненты-контейнеры для управления состоянием

### 2. Управление состоянием
- Использование Vuex для глобального состояния
- Локальное состояние через ref/reactive
- Композиционные функции для переиспользуемой логики
- События для коммуникации между компонентами

### 3. Оптимизация производительности
- Ленивая загрузка компонентов
- Мемоизация вычисляемых свойств
- Оптимизация рендеринга списков
- Кэширование данных

### 4. Доступность
- Семантическая разметка
- ARIA-атрибуты
- Клавиатурная навигация
- Поддержка скринридеров

## Взаимодействие компонентов

### 1. Навигация
- Header -> Auth (авторизация)
- Header -> Terminal (консоль)
- LeftAdminMenu -> UserAdmin (управление пользователями)
- LeftAdminMenu -> NewsAdmin (управление новостями)

### 2. Данные
- NewsAdmin -> NewsAdminAdd/Edit (редактирование новостей)
- UserAdmin -> AddUserModalComponent (добавление пользователей)
- TimetablePageComponents -> LessonsTimetable (отображение расписания)
- PrepodavateliPageComponents -> TeacherDetails (информация о преподавателе)

### 3. Состояние
- Header -> ThemeProvider (управление темой)
- Auth -> UserState (состояние пользователя)
- AdminPageComponents -> AdminState (состояние админки)

## Примеры использования

### 1. Компонент Header
```vue
<template>
  <Header>
    <template #logo>
      <img src="@/assets/logo.png" alt="Logo">
    </template>
    <template #nav>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/news">Новости</router-link>
      </nav>
    </template>
  </Header>
</template>
```

### 2. Компонент Auth
```vue
<template>
  <Auth
    :visible="isAuthVisible"
    @close="handleClose"
    @success="handleSuccess"
  />
</template>

<script setup>
const isAuthVisible = ref(false);
const handleClose = () => isAuthVisible.value = false;
const handleSuccess = (user) => {
  // Обработка успешной авторизации
};
</script>
```

### 3. Компонент NewsBlock
```vue
<template>
  <NewsBlock
    :news="newsList"
    :loading="isLoading"
    @load-more="handleLoadMore"
  >
    <template #empty>
      <p>Новостей пока нет</p>
    </template>
  </NewsBlock>
</template>
```

### 4. Компонент TeacherCard
```vue
<template>
  <TeacherCard
    :teacher="teacherData"
    :show-details="true"
    @click="handleTeacherClick"
  >
    <template #additional-info>
      <p>Стаж: {{ teacherData.experience }} лет</p>
    </template>
  </TeacherCard>
</template>
```

### 5. Компонент LessonsTimetable
```vue
<template>
  <LessonsTimetable
    :lessons="schedule"
    :current-week="currentWeek"
    :group="selectedGroup"
    @week-change="handleWeekChange"
    @group-change="handleGroupChange"
  />
</template>
``` 