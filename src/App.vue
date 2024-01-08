<script setup>
</script>

<template>
  <PageOverlay v-if="$state.loading" text="Loading">
    <Spinner/>
    <div>Loading</div>
  </PageOverlay>

  <div id="main-inner">
    <HeaderBar />
    <div id="main-content">
      <Thread v-bind="example_thread" />
      <Post v-bind="example_post" />
      <div @click="console.log(example_post)">test</div>
    </div>
  </div>

</template>

<script>
import PageOverlay from '@/components/PageOverlay.vue';
import Spinner from '@/components/Spinner.vue';
import HeaderBar from '@/components/HeaderBar.vue';

import Thread from '@/components/Thread.vue';
import Post from '@/components/Post.vue';

import { loremIpsum } from 'lorem-ipsum';

export default {

components: { PageOverlay, Spinner, HeaderBar, Thread, Post },

data() {
  return {
    example_thread: { 
      id: 1,
      title: loremIpsum({ units: "word", count: 4 }),
      user_id: 1,
      user_name: "user123",
      created_date: "24. 12. 2024",
      created_time: "12:34"
    },
    example_post: { 
      id: 1,
      content: loremIpsum({ count: 5 }),
      user_id: 1,
      user_name: "user123",
      created_date: "24. 12. 2024",
      created_time: "12:34",
      score: 5,
      reaction: 1
    }
  }
},

beforeMount() {
  this.$auth.auth = true;
},

}
</script>

<style lang="scss" scoped>
  @import '@/assets/lib.scss';

  #main-inner {
      @include container-vertical;
      width: 100%;
      max-width: 1200px;
      min-height: 100%;
  }

  #main-content {
    @include card;
    @include container-vertical;
    align-items: stretch;
    width: 100%;
    height: 100%;
    @include padded(1.5);
  }
</style>