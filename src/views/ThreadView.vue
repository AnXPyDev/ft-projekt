<template>
    <Page title="Thread">
        <Thread v-if="thread" v-bind="thread" />
        <Post v-for="post_data in posts" v-bind="post_data" @reply="insertReply" @delete="refresh(page)" :key="Math.random()"/>
        <div class="flex-spacer"></div>
        <Composer class="Composer" v-if="$auth.auth" @submit="createPost" :insert="composerInput" :area="true" placeholder="Post content" submitText="Post" />
        <Pager @select="handlePager" :page="page" v-bind="pager"/>
    </Page>
</template>

<script>
import { loremIpsum } from 'lorem-ipsum';
import Page from '@/components/Page.vue';
import Thread from '@/components/Thread.vue';
import Post from '@/components/Post.vue';
import Pager from '@/components/Pager.vue';
import Composer from '@/components/Composer.vue';

import Paged from '@/mixins/Paged';

export default {
    components: { Page, Post, Thread, Pager, Composer },
    mixins: [ Paged ],

    props: {
        id: { type: Number, required: true }
    },

    data() {
        return {
            thread: null,
            posts: [],
            page_cache: {},
            pager: {
                count: 1, width: 7
            },
            composerInput: null,
            blockPageWatcher: false,
        }
    },

    watch: {
        page() {
            if (this.blockPageWatcher) {
                return;
            }
            this.loadPage();
        },
    },

    methods: {
        refresh(page) {
            this.$state.loading++;
            this.getThread().then(() => {
                if (page == undefined || page > this.pager.count) {
                    page = this.pager.count;
                }
                this.page_cache = {};
                this.blockPageWatcher = true;
                this.page = page;
                this.loadPage();
                this.blockPageWatcher = false;
                this.$state.loading--;
            });
        },
        loadPage() {
            return new Promise((resolve, reject) => {
                if (this.page_cache[this.page]) {
                    this.posts = this.page_cache[this.page];
                    resolve();
                    return;
                }

                this.$state.loading++;
                this.$remote.getPosts(this.id, this.page).then((response) => {
                    this.page_cache[this.page] = response.posts;
                    this.posts = response.posts;
                    this.$state.loading--;
                    resolve();
                }, reject)
            }, this.$remote.errorHandler);
        },
        getThread() {
            return new Promise((resolve, reject) => {
                this.$remote.getThread(this.id).then((response) => {
                    this.pager.count = response.pages;
                    this.thread = response.thread;
                    resolve();
                }, reject);
            }, this.$remote.errorHandler);
        },
        createPost(content, callback) {
            this.$state.loading++;
            this.$remote.createPost(this.id, content).then((response) => {
                callback(true);
                this.refresh();
                this.$state.loading--;
            })
        },
        insertReply(id) {
            this.composerInput = () => ">>" + id.toString();
        },
    },

    mounted() {
        this.$state.loading++;
        this.getThread().then(() => {
            this.handleRoute();
            this.$state.loading--;
        })
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';
.Composer {
    width: 100%;
}
</style>