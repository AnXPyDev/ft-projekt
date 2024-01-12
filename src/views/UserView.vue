<template>
    <Page title="User">
      <User v-if="user" v-bind="user" />
    </Page>
</template>


<script>
import Page from '@/components/Page.vue';
import User from '@/components/User.vue';

export default {
    components: { Page, User },
    props: {
        id: { type: Number, required: true },
    },

    data() {
        return {
            user: null,
        };
    },

    mounted() {
        this.$state.loading++;
        this.$remote.getUser(this.id).then((response) => {
            this.user = response.user;
            console.log(response.user);
            this.$state.loading--;
        })
    }
}
</script>