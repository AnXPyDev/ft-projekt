<template>
    <div class="Post">
        <div class="info">
            <div>
                <div class="id"><i class="fa-regular fa-fingerprint"></i> {{ id }}</div>
                <UserLink :id="user_id" :name="user_name" />
            </div>
            <div>
                <div class="date"><i class="fa-regular fa-calendar"></i> {{ created_date }}</div>
                <div class="date"><i class="fa-regular fa-clock"></i> {{ created_time }}</div>
            </div>
        </div>
        <div class="content" ref="content">
        </div>
        <div v-if="$auth.auth" class="interactions">
            <div class="reactions">
                <div @click="react(1)" class="button upvote">
                    <i v-if="!upvoted" class="icon-inactive fa-regular fa-heart"></i>
                    <i v-if="upvoted" class="upvote-active fa-solid fa-heart"></i>
                </div>
                <div class="score">{{ m_score + m_reaction }}</div>
                <div @click="react(-1)" class="button">
                    <i v-if="!downvoted" class="fa-regular fa-dumpster-fire"></i>
                    <i v-if="downvoted" class="downvote-active fa-solid fa-dumpster-fire"></i>
                </div>
            </div>
            <div class="actions">
                <div v-if="isOwner" @click="changeContent" class="button"><i class="fa-regular fa-edit"></i> Edit</div>
                <div v-if="isOwner" class="button"><i class="fa-regular fa-trash"></i> Delete</div>
                <div class="button"><i class="fa-regular fa-reply"></i> Reply</div>
            </div>
        </div>
    </div>
</template>

<script>

import { loremIpsum } from 'lorem-ipsum';

const renderer = {
plain: (text) => {
    const el = document.createElement("span");
    el.innerText = text;
    el.classList.add("text");
    return el;
},

render: (content) => {
    const container = document.createElement("span");
    container.classList.add("inner-content");
    container.appendChild(renderer.plain(content));
    return container;
},

};

import UserLink from '@/components/UserLink.vue';

export default {
    components: { UserLink },
    props: {
        id: { type: Number, required: true },
        content: { type: String, required: true },
        user_id: { type: Number, required: true },
        user_name: { type: String, required: true },
        created_date: { type: String, required: true },
        created_time: { type: String, required: true },
        score: { type: Number },
        reaction: { type: Number }
    },

    data() {
        return {
            m_score: this.score - this.reaction,
            m_reaction: this.reaction,
            m_content: this.content,
            renderCache: undefined,
        }
    },

    computed: {
        isOwner() {
            return true;
        },

        upvoted() { return this.m_reaction == 1; },
        downvoted() { return this.m_reaction == -1; },
    },

    watch: {
        m_content() {
            this.renderContent();
            this.replaceContent();
        }
    },

    methods: {
        react(reaction) {
            if (this.m_reaction == reaction) {
                this.$remote.removeReaction(this.id).then(() => { this.m_reaction = 0 });
                return;
            }

            this.$remote.react(this.id, reaction).then(() => { this.m_reaction = reaction });
        },

        render(content) {
            return renderer.render(content);
        },

        renderContent() {
            const rendered = this.render(this.m_content);
            this.renderCache = rendered;
            return rendered;
        },

        replaceContent(rendered = this.renderCache) {
            this.$refs.content.replaceChildren(rendered);
        },

        changeContent() {
            this.m_content = loremIpsum({ count: 5 });
            console.log(this.m_content);
        }
    },

    beforeMount() {
        this.renderContent();
    },

    mounted() {
        this.replaceContent();
    },
}
</script>

<style lang="scss" scoped>
    @import '@/assets/lib.scss';
    .Post {
        @include card;
        @include container-vertical;
        @include outlined;
        @include hoverable;

        @include padded(0);

        align-items: stretch;

        .info {
            @include container;
            @include light-overlay;
            @include rounded;

            justify-content: space-between;

            > div {
                @include container;
                padding: 0;
            }
        }

        .content {
            @include padded(1);
        }
        
        .interactions {
            @include container;
            justify-content: space-between;
            
            > div {
                @include container;
                @include padded(0);
                @include rounded;
                @include light-overlay;
                overflow: hidden;
                align-items: stretch;
            }

            .button, .score {
                @include container;
            }

            .button {
                @include button;
                @include rounded;

                .upvote-active {
                    color: #ff6e6e;
                }

                .downvote-active {
                    color: #ffad6e;
                }
            }

        }
    }
</style>