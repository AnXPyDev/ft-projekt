<template>
    <div class="ThreadLink">
        <div class="title">{{ title }}</div>
        <div class="info">
            <div class="user"><i class="fa-regular fa-user"></i> {{ user_name }}</div>
            <div class="date"><i class="fa-regular fa-calendar"></i> {{ created_date }}</div>
            <div class="time"><i class="fa-regular fa-clock"></i> {{ created_time }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        user_id: { type: Number, required: true },
        user_name: { type: String, required: true },
        created_date: { type: String, required: true },
        created_time: { type: String, required: true },
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';

.ThreadLink {
    @include card(15);
    @include container;
    @include outlined;
    @include hoverable;
    justify-content: space-between;
    padding: 0;

    font-size: 1.1em;

    .title {
        padding: 0.5rem;
        font-size: 1.1em;
        font-weight: 700;
    }

    .info {
        @include container;
        @include rounded;
        @include light-overlay;
    }
}
</style>