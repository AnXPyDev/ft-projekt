import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import ThreadView from '@/views/ThreadView.vue';
import AuthView from '@/views/AuthView.vue';
import UserView from '@/views/UserView.vue';

const routes = [
  { path: '/', redirect: '/index' },
  { name: "home", path: '/index/:page?', component: HomeView,
    props: ({params}) => ({ page: Number.parseInt(params.page) || undefined })
  },
  { name: "thread", path: '/thread/:thread_id', component: ThreadView,
    props: ({params}) => ({ thread_id: Number.parseInt(params.thread_id) || undefined })
  },
  { name: "user", path: '/user/:user_id', component: UserView,
    props: ({params}) => ({ user_id: Number.parseInt(params.user_id) || undefined })
  },
  { name: "auth", path: '/auth/:action', component: AuthView, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
