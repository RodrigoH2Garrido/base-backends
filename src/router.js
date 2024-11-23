import { createMemoryHistory, createRouter } from "vue-router";
import Welcome from "./pages/Welcome.vue";
import About from "./pages/About.vue";
import User from "./pages/User.vue";
import UserProfile from "./pages/UserProfile.vue";
import UserPosts from "./pages/UserPosts.vue";


const routes = [
    { path: '/', component: Welcome},
    { path: '/about', component: About},
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                path: 'profile',
                component: UserProfile
            },
            {
                path: 'posts',
                component: UserPosts
            }
        ]
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router