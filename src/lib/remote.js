import axios from 'axios';

import { randInt } from './util';
import { LoremIpsum, loremIpsum } from 'lorem-ipsum';

const fake_config = {
    threads: 45,
    posts: 20,
}

const titleLipsum = () => loremIpsum({ units: "word", count: randInt(4, 8)});
const postLipsum = () => loremIpsum({ units: "sentence", count: randInt(1, 6)});

function genThread() {
    return {
        id: randInt(1, 20),
        title: titleLipsum(),
        user_id: randInt(1, 5),
        user_name: "user123",
        created_date: "12. 12. 2024",
        created_time: "12:34",
    };
}

function genPost() {
    return {
        id: randInt(1, 100),
        content: postLipsum(),
        user_id: randInt(1, 5),
        user_name: "user123",
        created_date: "24. 12. 2024",
        created_time: "12:34",
        score: randInt(-20, 30),
        reaction: randInt(-1, 1),
    }
}

export class Remote {
    constructor(auth, state, config = {
        threadsPerPage: 10,
        postsPerPage: 10,
    }) {
        this.auth = auth;
        this.state = state;
        this.config = config;
        this.axios = axios.create({
            baseURL: "http://localhost:80/forumtest/",
            timeout: 1000,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }   
        });

        this.errorHandler = (response) => {
            if (response) {
                this.state.error = response.error;
                return;
            }
            console.error("ERROR", response);
        }
    }

    fake_action(callback = () => ({ success: true }), onreject = this.errorHandler) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = callback();
                if (response.success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }, Math.random() * 100);
        }, onreject);
    }

    react(post_id, reaction) {
        return this.fake_action();
    }

    removeReaction(post_id) {
        return this.fake_action();
    }

    login(username, password) {
        return this.fake_action(() => {
            this.auth.auth = true;
            this.auth.user = {
                id: randInt(1, 5),
                name: username,
                admin: false,
            }
            return { success: true };
        });
    }

    register(username, password) {
        return this.fake_action(() => {
            this.auth.auth = true;
            this.auth.user = {
                id: randInt(1, 5),
                name: username,
                admin: false,
            }
            return { success: true };
        });
    }

    checkAuth() {
        return this.fake_action();
    }

    logout() {
        return this.fake_action(() => {
            this.auth.auth = false;
            this.auth.user = null;
            return { success: true };
        });
    }

    pingIndex() {
        return this.fake_action(() => {
            const threads = fake_config.threads;

            return {
                success: true,
                threads: threads,
                pages: Math.ceil(threads / this.config.threadsPerPage),
            }
        });
    }

    getThreads(page = 1) {
        return this.fake_action(() => {
            let threads = fake_config.threads;
            threads = threads - this.config.threadsPerPage * (page - 1);
            threads = Math.min(Math.max(this.config.threadsPerPage, 0), threads);

            return { 
                success: true,
                threads: Array(threads).fill(null).map((_, index) => genThread()),
            }
        });
    }

    editPost(id, content) {
        return this.fake_action();
    }

    getThread(id) {
        return this.fake_action(() => {
            const posts = fake_config.posts;

            return {
                success: true,
                posts: posts,
                pages: Math.ceil(posts / this.config.postsPerPage),
                thread: genThread(),
            }
        });
    }

    getPosts(thread_id, page = 1) {
        return this.fake_action(() => {
            let posts = fake_config.posts;
            posts = posts - this.config.postsPerPage * (page - 1);
            posts = Math.min(Math.max(this.config.postsPerPage, 0), posts);

            return { 
                success: true,
                posts: Array(posts).fill(null).map((_, index) => genPost()),
            }
        });
    }

    createThread(title) {
        return this.fake_action();
    }

    createPost(thread_id, content) {
        return this.fake_action();
    }

    deletePost(post_id) {
        return this.fake_action();
    }
}