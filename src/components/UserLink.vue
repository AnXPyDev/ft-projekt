<template>
    <RouterLink :to="{ name: 'user', params: { user_id: id } }" class="UserLink">
        <i class="fa-regular fa-user"></i>
        {{ name }}
    </RouterLink>
</template>

<script>
export default {
    props: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/lib.scss';
    .UserLink {
        @include fix-router-link;

        &:hover {
            text-decoration: underline;
        }
    }
</style>