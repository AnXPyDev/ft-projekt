<template>
    <Page title="Index">
      <Thread v-for="thread_data in threads" v-bind="thread_data" :key="keySeed + thread_data.id" />
      <div class="flex-spacer"></div>
      <Composer v-if="$auth.auth" submitText="Create Thread" placeholder="Thread title" @submit="createThread"/>
      <Pager @select="handlePager" :page="page" v-bind="pager"/>
    </Page>
</template>


<script>
import { loremIpsum } from 'lorem-ipsum';
import Page from '@/components/Page.vue';
import Thread from '@/components/Thread.vue';
import Pager from '@/components/Pager.vue';
import Composer from '@/components/Composer.vue';

import Paged from '@/mixins/Paged';

export default {
    components: { Page, Thread, Pager, Composer },
    mixins: [ Paged ],
    props: {},

    data() {
        return {
            threads: [],
            pager: {
                count: 1, width: 5
            },
            page_cache: {},
            blockPageWatcher: false,
            keySeed: Math.random().toString(),
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
        refresh() {
            this.$state.loading++;
            this.ping().then(() => {
                this.page_cache = {};
                this.blockPageWatcher = true;
                this.page = 1;
                this.keySeed = Math.random().toString();
                this.loadPage();
                this.blockPageWatcher = false;
                this.$state.loading--;
            });
        },

        loadPage() {
            return new Promise((resolve, reject) => {
                if (this.page_cache[this.page]) {
                    this.threads = this.page_cache[this.page];
                    resolve();
                    return;
                }

                this.$state.loading++;
                this.$remote.getThreads(this.page).then((response) => {
                    this.page_cache[this.page] = response.threads;
                    this.threads = response.threads;
                    this.$state.loading--;
                    resolve();
                }, reject)
            }, this.$remote.errorHandler);
        },

        ping() {
            return new Promise((resolve, reject) =>
                this.$remote.pingIndex().then((response) => {
                    this.pager.count = response.pages;
                    resolve();
                }, reject)
            , this.$remote.errorHandler);
        },

        createThread(title, callback) {
            this.$state.loading++;
            this.$remote.createThread(title).then((response) => {
                callback(true);
                this.refresh();
                this.$state.loading--;
            })
        },
    },

    mounted() {
        this.$state.loading++;
        this.ping().then(() => {
            this.handleRoute();
            this.$state.loading--;
        });
        document.title = "Index";
    }
}

</script>

<style lang="scss" scoped>
</style>