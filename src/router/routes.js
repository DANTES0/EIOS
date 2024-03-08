import{createRouter, createWebHistory} from "vue-router"
import Main from "../pages/Main.vue"
import News from "../pages/News.vue"
import Entrants from "../pages/Entrants.vue"
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
        path: '/entrants',
        name: "Entrants",
        component: Entrants
    },
    {
        path: '/gallery',
        name: "Gallery",
        component: Gallery
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;