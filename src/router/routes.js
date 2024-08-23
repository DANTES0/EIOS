import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import NewsPage from '../pages/NewsPage.vue';
import Timetable from '../pages/Timetable.vue';
import Gallery from '../pages/Gallery.vue';
import AllPrepodavateli from '../pages/AllPrepodavateli.vue';
import Admin from '../pages/Admin.vue';
import NewsContent from '../pages/NewsContent.vue';
import NewsAdminAdd from '../components/AdminPageComponents/NewsAdminAdd.vue';
import PrepodDetails from '../components/PrepodavateliPageComponents/PrepodDetails.vue';
import TeachersChange from '../components/AdminPageComponents/TeachersChange.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/news',
        name: 'NewsPage',
        component: NewsPage,
    },
    {
        path: '/timetable',
        name: 'Timetable',
        component: Timetable,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/admin/teachers',
        name: 'AddTeachers',
        component: TeachersChange,
    },
    {
        path: '/teachers',
        name: 'Teachers',
        component: AllPrepodavateli,
    },
    {
        path: '/teachers/:id',
        name: 'TeacherDetail',
        component: PrepodDetails,
    },
    {
        path: '/news/get/:id',
        name: 'NewsContent',
        component: NewsContent,
    },
    // {
    //     path: '/news/get/admin/:id',
    //     name: 'NewsAdminAdd',
    //     component: NewsAdminAdd,
    // },
    {
        path: '/news/get/admin',
        name: 'NewsAdminAdd',
        component: NewsAdminAdd,
    },
];

//newsContent
const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    history: createWebHistory(),
    routes,
});

export default router;
