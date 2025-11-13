import { createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Recipe from '../components/Recipe.vue'
import News from '../components/News.vue'
import About from '../components/About.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/recipe', component: Recipe },
    { path: '/news', component: News},
    { path: '/about', component: About}
]

const router = createRouter({
      history: createWebHashHistory(import.meta.env.BASE_URL),
      routes,
})

export default router;