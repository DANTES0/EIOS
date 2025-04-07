import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';
import MainPage from '../pages/MainPage.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../pages/MainPage.vue'),
    },
    {
        path: '/news',
        name: 'NewsPage',
        component: () => import('../pages/NewsPage.vue'),
    },
    {
        path: '/timetable',
        name: 'Timetable',
        component: () => import('../pages/TimetablePage.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: { requiresAuth: true },
        component: () => import('../pages/AdminPage.vue'),
    },
    {
        path: '/teachers',
        name: 'Teachers',
        component: () => import('../pages/TeachersPage.vue'),
    },
    {
        path: '/teachers/detail/:id',
        name: 'TeacherDetail',
        component: () =>
            import('../components/PrepodavateliPageComponents/TeacherDetails.vue'),
    },
    {
        path: '/news/get/:id',
        name: 'NewsContent',
        component: () => import('../pages/NewsContent.vue'),
    },
    {
        path: '/news/get/admin',
        name: 'NewsAdminAdd',
        meta: { requiresAuth: true },
        component: () => import('../components/AdminPageComponents/NewsAdminAdd.vue'),
    },
    {
        path: '/news/get/admin/:id',
        name: 'NewsAdminEdit',
        meta: { requiresAuth: true },
        component: () => import('../components/AdminPageComponents/NewsAdminEdit.vue'),
    },
    {
        path: '/:pathMatch(.*)*',  // Catch-all путь для всех несуществующих маршрутов
        name: 'not-found',
        component: () => import('../pages/MainPage.vue'), // Страница 404
    },
];

const router = createRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isLoggedIn;

    if (
        to.path.startsWith('/admin') &&
        to.matched.some((record) => record.meta.requiresAuth)
    ) {
        // Если маршрут требует авторизации
        if (!isAuthenticated) {
            // Если пользователь не авторизован, перенаправляем на страницу логина
            next({ name: 'Main' });
        } else {
            next(); // Переходим на запрашиваемую страницу
        }
    } else {
        next(); // Если не требуется авторизация, просто переходим
    }
});

export default router;
