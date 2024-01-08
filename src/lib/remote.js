import axios from 'axios';

class Remote {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:80/forumtest/",
            timeout: 1000,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }   
        });
    }

    ping() {
        return this.axios.post("ping.php", { message: "Hello From FrontEnd" });
    }
}

export const remote = new Remote();