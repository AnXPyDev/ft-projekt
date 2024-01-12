<template>
    <div class="PageOverlay">
        <div class="overlay">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/lib.scss';

.PageOverlay {
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    .overlay {
        @include container-vertical;
        justify-content: center;

        position: fixed;
        
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;


        z-index: 99;
        background-color: rgba($clr_bg, 0.9);
    }
}
</style>