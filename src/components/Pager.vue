<template>
    <div class="Pager">
        <div class="inner">
            <div @click="previous" class="button" :class="{'active': m_page > 1 }">
                <i class="fa-regular fa-chevron-left"></i>
            </div>

            <div @click="select(index)" class="button active" v-for="index in visibleIndexes" :class="{'current': index == m_page}">{{ index }}</div>

            <div @click="next" class="button" :class="{'active': m_page < count }">
                <i class="fa-regular fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        page: { type: Number, default: 1 },
        count: { type: Number, default: 1 },
        width: { type: Number, default: 11 }
    },

    emits: ['select'],

    data() {
        return {
            m_page: this.page,
        }
    },

    methods: {
        previous() {
            this.select(this.m_page - 1);

        },
        next() {
            this.select(this.m_page + 1);

        },
        select(index) {
            if (index < 1 || index > this.count) {
                return;
            }

            this.$emit('select', index, (response) => {
                if (response) {
                    this.m_page = index;
                }
            });
        },
    },

    computed: {
        visibleIndexes() {
            const width = this.width % 2 == 1 ? this.width : this.width + 1;
            let w = (width - 1) / 2;
            let min = this.m_page;
            let max = this.m_page;

            if (min - w < 1) {
                min = 1;
                max = min + width - 1;
                if (max > this.count) {
                    max = this.count;
                }
            } else if (max + w > this.count) {
                max = this.count;
                min = max - width + 1;
                if (min < 1) {
                    min = 1;
                }
            } else {
                min -= w;
                max += w;
            }

            return [...Array(max - min + 1).keys()].map((_, index) => min + index);
        }
    },

}
</script>

<style lang="scss" scoped>
@import '@/assets/lib.scss';

.Pager {
    @include container;
    @include padded(0);

    justify-content: space-around;

    .inner {
        @include container;
        @include padded(0);
        @include rounded;
        @include outlined;
        @include light-overlay;

        align-items: stretch;
    }
    .button {
        @include container;
        @include rounded;
        justify-content: space-around;
        
        min-width: 2.5em;
        
        color: rgba($clr_fg, 0.5);

        &.current {
            @include highlight;
        }

        &.active {
            @include button;
            color: $clr_fg;
        }
    }
}

</style>