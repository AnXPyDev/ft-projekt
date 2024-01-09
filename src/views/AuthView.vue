<template>
    <Page :modal="true" :header_args="{ showMenu: false }" class="AuthView">
        <div class="inputbox">
            <i class="fa-regular fa-user"></i>
            <input type="text" placeholder="Username" v-model="login">
        </div>
        <div class="inputbox">
            <i class="fa-regular fa-lock"></i>
            <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="button" :class="{ 'active': canSubmit }" @click="submit">
            <span v-if="action == 'login'"><i class="fa-regular fa-right-to-bracket"></i> Login</span>
            <span v-if="action == 'register'"><i class="fa-regular fa-user-plus"></i> Register</span>
        </div>
    </Page>
</template>

<script>
import Page from '@/components/Page.vue';

export default {
    components: { Page },
    props: {
        action: { type: String, required: true }
    },
    data() {
        return {
            login: null,
            password: null,
        }
    },

    computed: {
        canSubmit() {
            return !!this.login && !!this.password;
        }
    },
    
    methods: {
        submit() {
            if (this.action == "login") {
                this.$remote.login(this.login, this.password).then(() => {
                    this.$router.push({ name: "home" });
                });
            } else if (this.action == "register") {
                this.$remote.register(this.login, this.password).then(() => {
                    this.$router.push({ name: "home" });
                });
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';

.AuthView {

    .inputbox {
        @include container;
        @include hoverable;
        @include rounded;
        @include outlined;

        color: $clr_fg;

        input {
            @include fix-input;
        }
    }

    .button {
        @include container;
        @include rounded;
        @include outlined;

        cursor: default;

        color: deactivate($clr_fg);

        &.active {
            @include button;
            color: $clr_fg;
        }
    }

}
</style>