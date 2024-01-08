<template>
    <div class="header-bar">
        <div class="title">Forum</div>
        <div class="menu">
            <div v-if="$auth.auth">Logged in</div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.header-bar {
    @include bar;

    padding: 0.5rem;

    color: $clr_bg;

    .title {
        font-family: "Pacifico";
        font-size: 2.5em;
        color: $clr_primary;
    }
}
</style>