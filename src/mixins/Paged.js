export default {
    data() {
        return {
            page: null,
        }
    },
    watch: {
        $route() {
            this.handleRoute();
        }
    },
    methods: {
        handlePager(index) {
            if (this.page == index) {
                return;
            }
            this.$router.push({ name: this.$route.name, params: this.$route.params, query: { page: index } });
        },
        handleRoute() {
            const page = Number.parseInt(this.$route.query.page);
            if (!isNaN(page) && page != this.page) {
                this.page = page;
                return;
            }

            this.page = 1;
        },
    },
}