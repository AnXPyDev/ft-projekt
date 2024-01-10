<script setup>
</script>

<template>
  <PageOverlay v-if="!$state.error && $state.loading > 0">
    <Spinner/>
    <div>Loading</div>
  </PageOverlay>

  <PageOverlay class="ErrorOverlay" v-if="$state.error">
    <i class="icon fa-solid fa-triangle-exclamation"></i>
    <div class="title">Error</div>
    <div class="message">{{ $state.error }}</div>
    <div class="buttons">
      <div @click="errorContinue" class="button"><i class="fa-regular fa-xmark"></i> Continue</div>
      <div @click="errorRefresh" class="button"><i class="fa-regular fa-arrows-rotate"></i> Refresh</div>
    </div>
  </PageOverlay>

  <RouterView></RouterView>
</template>

<script>
import PageOverlay from '@/components/PageOverlay.vue';
import Spinner from '@/components/Spinner.vue';

export default {

components: { PageOverlay, Spinner },

data() {
  return {
  }
},

methods: {
  errorContinue() {
    this.$state.error = null;
    this.$state.loading = 0;
  },
  errorRefresh() {
    window.location.reload();
  }
},

mounted() {
  this.$state.loading++;
  this.$remote.checkAuth().then(() => {
    this.$state.loading--;
  });
},

}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.ErrorOverlay {
  font-size: 1.5em;

  .icon, .title {
    color: #f44336;
  }

  .icon {
    font-size: 6em;
  }

  .title {
    font-size: 2em;
    font-weight: 900;
    letter-spacing: 4px;
  }

  .buttons {
    @include container;
    @include padded(0);
    @include rounded;
    @include light-overlay;

    .button {
      @include container;
      @include button;
      @include rounded;
    }
  }
}
</style>