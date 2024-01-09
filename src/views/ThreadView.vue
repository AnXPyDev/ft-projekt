<template>
    <Page title="Thread">
      <Thread v-bind="thread_data" />
      <Post v-for="post_data in posts" v-bind="post_data" />
      <Pager @select="handlePager" v-bind="pager"/>
    </Page>
</template>

<script>
import { loremIpsum } from 'lorem-ipsum';
import Page from '@/components/Page.vue';
import Thread from '@/components/Thread.vue';
import Post from '@/components/Post.vue';
import Pager from '@/components/Pager.vue';

export default {
    components: { Page, Post, Thread, Pager },

    props: {
        page: { type: Number, default: 1 },
        thread_id: { type: Number, required: true }
    },

    data() {
        return {
            thread_data: { 
                id: 1,
                title: loremIpsum({ units: "word", count: 4 }),
                user_id: 1,
                user_name: "user123",
                created_date: "24. 12. 2024",
                created_time: "12:34"
            },
            posts: [{ 
                id: 1,
                content: loremIpsum({ count: 5 }),
                user_id: 1,
                user_name: "user123",
                created_date: "24. 12. 2024",
                created_time: "12:34",
                score: 5,
                reaction: 1
            }],
            pager: {
                page: this.page, count: 10, width: 7
            }
        }
    },

    methods: {
        getPosts(index) {
            this.$state.loading = true;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.$state.loading = false;
                    resolve()
                }, 100);
            });
        },

        handlePager(index, callback) {
            this.getPosts(index).then(() => {
                callback(true);
            });
        }
    }
}

</script>