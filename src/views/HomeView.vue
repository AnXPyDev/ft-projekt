<template>
    <Page title="Index">
      <Thread v-for="thread_data in threads" v-bind="thread_data" />
      <div class="spacer"></div>
      <Pager @select="handlePager" :page="page" v-bind="pager"/>
    </Page>
</template>


<script>
import { loremIpsum } from 'lorem-ipsum';
import Page from '@/components/Page.vue';
import Thread from '@/components/Thread.vue';
import Pager from '@/components/Pager.vue';

export default {
    components: { Page, Thread, Pager },
    props: {
        page: { type: Number, default: 1 }
    },

    data() {
        return {
            m_page: this.page,
            threads: [],
            pager: {
                count: 1, width: 5
            },
            page_cache: {},
        }
    },

    watch: {
        m_page() {
            this.loadPage();
        }
    },

    methods: {
        handlePager(index, callback) {
            if (this.m_page == index) {
                return;
            }
            this.m_page = index;
            callback(true);
        },

        loadPage() {
            if (this.page_cache[this.m_page]) {
                this.threads = this.page_cache[this.m_page];
                return;
            }

            this.$state.loading = true;
            this.$remote.getThreads(this.m_page).then((response) => {
                this.page_cache[this.m_page] = response.threads;
                this.threads = response.threads;
                this.$state.loading = false;
            })
        },

        ping() {
            this.$remote.pingIndex().then((response) => {
                this.m_page = Math.min(this.m_page, response.pages);
                this.pager.count = response.pages;
            });
        },
    },

    mounted() {
        this.ping();
        this.loadPage();
    }
}

</script>

<style lang="scss" scoped>
.spacer {
    height: 100%;
    width: 100%;
    flex-grow: 2;
}
</style>