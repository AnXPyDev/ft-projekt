<template>
    <div class="page-overlay">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.page-overlay {
    @include container-vertical;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 99;

    background-color: rgba($clr_bg, 0.9);
}
</style>