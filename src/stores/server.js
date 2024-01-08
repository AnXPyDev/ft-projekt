import { defineStore } from 'pinia';

export const useServerStore = defineStore('server', {
    state: () => ({
        url: "http://localhost:80/forum/"
    })
});
