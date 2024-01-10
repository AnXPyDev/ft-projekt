import { createApp, ref } from 'vue';
import { createPinia } from 'pinia';

import "@/assets/main.scss";

import App from './App.vue';
import router from './router';

import { useAuthStore } from './stores/auth';
import { useStateStore } from './stores/state';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

const authStore = useAuthStore(pinia);
const stateStore = useStateStore(pinia);

app.config.globalProperties.$auth = authStore;
app.config.globalProperties.$state = stateStore;

import { Remote } from '@/lib/Remote.js';

app.config.globalProperties.$remote = new Remote(authStore, stateStore);

app.mount('#app');
