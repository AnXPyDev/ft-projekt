import axios from 'axios';

import { randInt } from './util';
import { LoremIpsum, loremIpsum } from 'lorem-ipsum';
import { Promise2 } from './Promise2';

const fake_config = {
    threads: 45,
    posts: 20,
}

const titleLipsum = () => loremIpsum({ units: "word", count: randInt(4, 8)});
const postLipsum = () => loremIpsum({ units: "sentence", count: randInt(1, 6)});

function clamp(x, min) {
    if (x < min) {
        return min;
    }
    return x;
}

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
            baseURL: "http://localhost:80/forum/",
            timeout: 1000,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }   
        });

        this.errorHandler = (response) => {
            if (response) {
                this.state.error = response.message || response.error;
                return;
            }
            console.error("ERROR", response);
        }
    }

    fake_action(callback = () => ({ success: true })) {
        return new Promise2((resolve, reject) => {
            setTimeout(() => {
                const response = callback();
                if (response.success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }, Math.random() * 100);
        }).catch(this.errorHandler);
    }

    action(action, args={}, endpoint="action.php") {
        return new Promise2((resolve, reject) => {
            this.axios.post(endpoint, { action, ...args }).then((response) => {
                const data = response.data;
                if (!data) {
                    reject({ success: false, message: "No response received"});
                    return;
                }

                if (!data.success) {
                    reject(data);
                    return;
                }
                resolve(data);
            }, (reason) => {
                reject({ success: false, message: "Request failed", reason })
            });
        }).catch(this.errorHandler);
    }


    setUserData(user_data) {
        console.log(user_data);
        this.auth.user = {
            id: user_data.id, 
            name: user_data.username, 
            admin: user_data.admin, 
            banned: user_data.banned,
        }
    }

    login(username, password) {
        return new Promise2((resolve, reject) => {
            this.action("login", { username, password }).then((response) => {
                this.checkAuth().then(resolve, reject);
            }).catch(reject);
        }).catch(this.errorHandler);
    }

    register(username, password) {
        return new Promise2((resolve, reject) => {
            this.action("register", { username, password }).then(() => {
                this.login(username, password).then(() => {
                    this.checkAuth().then(resolve, reject);
                }, reject);
            }, reject);
        }).catch(this.errorHandler);
    }

    checkAuth() {
        return new Promise2((resolve, reject) => {
            this.action("getinfo").then((response) => {
                this.auth.auth = response.login;
                this.auth.session = response.session;
                this.setUserData(response.user_data);
                resolve(response);
            }, (reason) => {
                reject(reason);
            });
        }).catch(this.errorHandler);
    }

    logout() {
        return this.action("logout").then((response) => {
            this.auth.auth = false;
            this.auth.user = null;
        });

        return this.fake_action(() => {
            this.auth.auth = false;
            this.auth.user = null;
            return { success: true };
        });
    }

    pingIndex() {
        return new Promise2((resolve, reject) => {
            this.action("pingindex").then((response) => {
                resolve({
                    ...response,
                    pages: clamp(Math.ceil(response.threads / this.config.threadsPerPage), 1),
                })
            }, reject);
        }).catch(this.errorHandler);


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
        return this.action("getthreads", {
            from: (page - 1) * this.config.threadsPerPage,
            count: this.config.threadsPerPage,
        });

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

    getThread(id) {
        return new Promise2((resolve, reject) => {
            console.log({id});
            this.action("getthread", { id }).then((response) => {
                resolve({
                    ...response,
                    pages: clamp(Math.ceil(response.posts / this.config.postsPerPage), 1)
                })
            }, reject);
        }).catch(this.errorHandler);


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
        return this.action("getposts", {
            thread_id,
            from: (page - 1) * this.config.postsPerPage,
            count: this.config.postsPerPage
        });

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
        return this.action("newthread", { title });
    }

    createPost(thread_id, content) {
        console.log(content);
        return this.action("newpost", { thread_id, content });
    }

    deletePost(post_id) {
        return this.action("postmod", { post_id, mod: "delete" });
    }
    
    editPost(post_id, content) {
        return this.action("postmod", { post_id, mod: "edit", content });
    }

    setUserPriv(id, priv) {
        return this.action("usermod", { id, mod: "setadmin", level: priv });
    }

    setUserBan(id, banned) {
        return this.action("usermod", { id, mod: {[0]: "unban", [1]: "ban"}[banned] });
    }

    deleteUser(id) {
        return this.action("usermod", { id, mod: "delete" });
    }
    

    react(post_id, reaction) {
        return this.action("react", { post_id, type: { [1]: "like", [-1]: "dislike"}[reaction] });
    }

    removeReaction(post_id) {
        return this.action("react", { post_id, type: "discard" });
    }

}