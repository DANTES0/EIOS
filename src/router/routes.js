import{createRouter, createWebHistory} from "vue-router"
import Main from "../pages/Main.vue"
import News from "../pages/News.vue"
import Timetable from "../pages/Timetable.vue"
import Gallery from "../pages/Gallery.vue"
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
        path: '/gallery',
        name: "Gallery",
        component: Gallery
    }
]

const router = createRouter({
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      },
    history: createWebHistory(),
    routes
})

export default router;