import VHome from "../views/VSuperheroes.vue";
import {createRouter, createWebHistory} from "vue-router";
import VSuperhero from "../views/VSuperhero.vue";

const routes =[
    {
        path:'/',
        component: VHome,
        name: "home"
    },
    {
        path: '/superhero/:id',
        component: VSuperhero,
        name: "superhero"
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;