<template>
    <div class="Composer" :class="{ area }">
        <div class="inner">
            <textarea class="field" v-if="area" v-model="text" :placeholder="placeholder"></textarea>
            <input class="field" v-else v-model="text" :placeholder="placeholder" />
        </div>
        <div class="menu">
            <div @click="submit" class="button" :class="{ active: canSubmit }"><i class="fa-regular fa-check"></i> {{ submitText }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        emits: [ 'submit' ],
        props: {
            area: { type: Boolean, default: false },
            submitText: { type: String, default: "Submit" },
            insert: { type: String },
            placeholder: { type: String },
        },

        computed: {
            canSubmit() {
                return !!this.text;
            }
        },

        data() {
            return {
                text: "",
            }
        },


        watch: {
            insert(value) {
                if (value == null) {
                    return;
                }
                this.text += value().toString();
            }
        },

        methods: {
            submit() {
                if (!this.canSubmit) {
                    return;
                }

                this.$emit("submit", this.text, (response) => {
                    if (response) { this.text = "" }
                });
            }
        },



    }
</script>

<style lang="scss" scoped>
    @import '@/assets/lib.scss';
    .Composer {
        @include container;
        padding: 0;

        &:not(.area) {
            align-items: stretch;
        }

        &.area {
            flex-direction: column;

            .menu {
                display: flex;
                width: 100%;
                justify-content: flex-end;
            }
        }

        .inner {
            @include outlined;
            @include rounded;
            @include container;

            width: 100%;

            .field {
                @include fix-input;
                width: 100%;
            }

            textarea {
                resize: vertical;
            }
        }

        .button {
            @include container;
            @include rounded;
            @include light-overlay;

            color: deactivate($clr_fg);

            &.active {
                @include button;
                color: inherit;
            }

            white-space: nowrap;
        }
    }
</style>