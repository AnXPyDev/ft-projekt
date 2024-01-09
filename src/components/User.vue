<template>
    <div class="User">
        <div class="username">
            <i class="fa-regular fa-user"></i> {{ username }}
        </div>
        <div class="menu">
            <div class="switch">
                <div class="button">
                </div>
            </div>
            <div class="switch">
                <div @click="setPriv(0)" class="button" :class="switchClass(0)"><i class="fa-regular fa-user"></i> User</div>
                <div @click="setPriv(1)" class="button" :class="switchClass(1)"><i class="fa-regular fa-user-tie"></i> Moderator</div>
                <div @click="setPriv(2)" class="button" :class="switchClass(2)"><i class="fa-regular fa-crown"></i> Admin</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: Number, required: true },
        username: { type: String, required: true },
        admin: { type: Number, required: true },
        banned: { type: Number, required: true },
    },
    data() {
        return {
            m_admin: this.admin,
            m_banned: this.banned,
        }
    },
    computed: {
        canModPriv() {
            return this.$auth.auth && this.$auth.user.admin == 2;
        },
        switchClass() {
            return (level) => ({
                active: this.canModPriv,
                selected: this.m_admin == level,
            });
        },
    },
    methods: {
        setPriv(priv) {
            if (!this.canModPriv) {
                return;
            }
            this.m_admin = priv;
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.User {
    @include container;
    @include outlined;
    @include rounded;
    @include hoverable;

    justify-content: space-between;

    .menu {
        @include container;
        padding: 0;

        .button {
            @include container;
            @include rounded;

            cursor: default;

            color: deactivate($clr_fg);

            &.active {
                @include button;
                color: inherit;
            }
        }

        .switch {
            @include card;
            @include rounded;
            @include container;
            @include padded(0);

            .button {
                color: deactivate($clr_fg);

                &.active {
                    color: deactivate($clr_fg, 0.7);
                }

                &.selected {
                    @include light-overlay;
                    @include outlined;
                    color: inherit;
                }
            }
        }
    }
}
</style>