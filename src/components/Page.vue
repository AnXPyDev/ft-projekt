<template>
    <div id="main-inner" :class="{ 'modal': !!modal }">
        <HeaderBar class="HeaderBar" v-bind="header_args" />
        <div id="main-content">
            <div v-if="title" class="title">{{ title }}</div>
            <slot></slot>
        </div>
        <div class="credit">Vytvoril Jozef Komáromy - UKF 2AI22b</div>
    </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';

export default {
    components: { HeaderBar },
    props: {
        title: { type: String },
        modal: { type: Boolean },
        header_args: { type: Object, default: {} },
    }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/lib.scss';

  #main-inner {
    @include container-vertical;
    width: 100%;
    max-width: 1200px;
    min-height: 100%;

    #main-content {
      @include card;
      @include container-vertical;
      align-items: stretch;
      width: 100%;
      height: 100%;
      @include padded(1.5);
    }

    .HeaderBar {
      width: 100%;
    }
  }

  #main-inner.modal {
    justify-content: center;

    #main-content {
      align-items: center;
      width: auto;
      height: auto;
    }

    .HeaderBar {
      width: auto;
    }
  }


  .title {
    font-weight: 700;
    font-size: 2em;
    letter-spacing: 1px;
  }

  .credit {
    color: $clr_bg;
  }

</style>
