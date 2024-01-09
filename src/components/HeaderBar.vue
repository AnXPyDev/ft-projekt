<template>
    <div class="header-bar">
        <RouterLink :to="{ name: 'home' }" class="title">Forum</RouterLink>
        <div v-if="showMenu" class="menu">
            <RouterLink v-if="showAuth && !$auth.auth" to="/auth/login" class="RouterLink button">
                <i class="fa-regular fa-right-to-bracket"></i> Login
            </RouterLink>
            <RouterLink v-if="showAuth && !$auth.auth" to="/auth/register" class="RouterLink button">
                <i class="fa-regular fa-user-plus"></i> Register
            </RouterLink>
            <div v-if="showAuth && $auth.auth" @click="logout" class="button">
                <i class="fa-regular fa-right-from-bracket"></i> Logout
            </div>
            <UserLink v-if="showAuth && $auth.auth" class="button" :id="$auth.user.id" :name="$auth.user.name" />
        </div>
    </div>
</template>

<script>
import UserLink from '@/components/UserLink.vue';

export default {
    components: { UserLink },
    props: {
        showAuth: { type: Boolean, default: true },
        showMenu: { type: Boolean, default: true },
    },
    methods: {
        logout() {
            this.$remote.logout();
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.header-bar {
    @include container;
    justify-content: space-between;

    padding: 0.5rem;
    padding-left: 0;
    padding-right: 0;

    .title {
        font-family: "Pacifico";
        font-size: 2.5em;
        color: $clr_primary;

        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .menu {
        @include card;
        @include container;
        @include rounded;
        @include padded(0);
        
        background-color: $clr_bg;
        
        .RouterLink {
            @include fix-router-link;
        }

        .button {
            @include button;
            @include container;
            @include rounded;
            @include padded(1.5);
        }
    }
}
</style>