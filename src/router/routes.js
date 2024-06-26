import { createRouter, createWebHistory } from "vue-router"
import Main from "../pages/Main.vue"
import News from "../pages/News.vue"
import Timetable from "../pages/Timetable.vue"
import Gallery from "../pages/Gallery.vue"
import Admin from "../pages/Admin.vue"
import NewsContent from "../pages/NewsContent.vue";
import NewsAdminAdd from "../components/AdminPageComponents/NewsAdminAdd.vue"
const routes = [
    {
        path: '/',
        name: "Main",
        component: Main
    },
    {
        path: '/news',
        name: "News",
        component: News
    },
    {
        path: '/timetable',
        name: "Timetable",
        component: Timetable
    },
    {
        path: '/admin',
        name: "Admin",
        component: Admin
    },
    {
        path: '/news/get/:id',
        name: "NewsContent",
        component: NewsContent
    },
    {
        path: '/news/get/admin/:id',
        name: "NewsAdminAdd",
        component: NewsAdminAdd
    }
]
//newsContent
const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    history: createWebHistory(),
    routes
})

export default router;