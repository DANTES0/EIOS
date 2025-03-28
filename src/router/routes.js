import { createRouter, createWebHistory } from 'vue-router';

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
        component: () => import('../components/AdminPageComponents/NewsAdminAdd.vue'),
    },
    {
        path: '/news/get/admin/:id',
        name: 'NewsAdminEdit',
        component: () => import('../components/AdminPageComponents/NewsAdminEdit.vue'),
    },
];

const router = createRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    history: createWebHistory(),
    routes,
});

export default router;
