import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import ThreadView from '@/views/ThreadView.vue';
import AuthView from '@/views/AuthView.vue';
import UserView from '@/views/UserView.vue';

const routes = [
  { path: '/', redirect: '/index' },
  { name: "home", path: '/index', component: HomeView },
  { name: "thread", path: '/thread/:id', component: ThreadView,
    props: ({params}) => ({ id: Number.parseInt(params.id) || undefined })
  },
  { name: "user", path: '/user/:id', component: UserView,
    props: ({params}) => ({ id: Number.parseInt(params.id) || undefined })
  },
  { name: "auth", path: '/auth/:action', component: AuthView, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
