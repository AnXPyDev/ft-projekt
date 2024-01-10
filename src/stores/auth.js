import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        auth: false,
        session: null,
        user: null,
    }),
    actions: {
    }
});
