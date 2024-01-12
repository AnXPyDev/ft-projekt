<template>
    <div class="User">
        <div class="username">
            <i class="fa-regular fa-user"></i> {{ username }}
        </div>
        <div class="menu">
            <div v-if="isAuthAdmin" @click="deleteUser" class="button active">
                <i class="fa-regular fa-trash"></i> Delete User
            </div>
            <div v-if="isAuthModerator" class="switch">
                <div @click="setBan(0)" class="button active" :class="{ selected: m_banned == 0 }"><i class="fa-regular fa-shield-check"></i></div>
                <div @click="setBan(1)" class="button active" :class="{ selected: m_banned == 1 }"><i class="fa-regular fa-ban"></i> Banned</div>
            </div>
            <div v-else-if="m_banned == 1">
                <div class="button opaque"><i class="fa-regular fa-ban"></i> Banned</div>
            </div>
            <div class="switch">
                <div @click="setPriv(0)" class="button" :class="privSwitchClass(0)"><i class="fa-regular fa-user"></i> User</div>
                <div @click="setPriv(1)" class="button" :class="privSwitchClass(1)"><i class="fa-regular fa-user-tie"></i> Moderator</div>
                <div @click="setPriv(2)" class="button" :class="privSwitchClass(2)"><i class="fa-regular fa-crown"></i> Admin</div>
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
    emits: [ 'delete' ],
    data() {
        return {
            m_admin: this.admin,
            m_banned: this.banned,
        }
    },
    computed: {
        isAuthAdmin() {
            return this.$auth.auth && this.$auth.user.admin == 2;
        },
        isAuthModerator() {
            return this.$auth.auth && this.$auth.user.admin >= 1;
        },
        canModPriv() {
            return this.isAuthAdmin && this.$auth.user.id != this.id;
        },
        privSwitchClass() {
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
            this.$remote.setUserPriv(this.id, priv).then(() => {
                this.m_admin = priv;
            });
        },
        setBan(banned) {
            if (!this.isAuthModerator) {
                return;
            }
            this.$remote.setUserBan(this.id, banned).then(() => {
                this.m_banned = banned;
            });
        },
        deleteUser() {
            this.$remote.deleteUser(this.id).then(() => {
                this.$emit('delete', this.id);
            });
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

            &.opaque {
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