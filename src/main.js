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

app.config.globalProperties.$auth = useAuthStore(pinia);
app.config.globalProperties.$state = useStateStore(pinia);

import { remote } from '@/lib/remote';

app.config.globalProperties.$remote = remote;

app.mount('#app');
