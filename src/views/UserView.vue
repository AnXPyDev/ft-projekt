<template>
    <Page title="User">
      <User v-bind="user_data" />
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
            user_data: {
                id: 1,
                username: "user123",
                admin: 0,
                banned: 0,
            }
        };
    }
}
</script>