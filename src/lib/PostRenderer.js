class State {
    constructor(state) {
        this.italic = false;
        this.bold = false;
        this.underline = false;
        this.strikethrough = false;

        if (state != null) {
            this.italic = state.italic;
            this.bold = state.bold;
            this.underline = state.underline;
            this.strikethrough = state.strikethrough;
        }
    }

    equal(state) {
        if (this.italic == state.italic
            && this.bold == state.bold
            && this.underline == state.underline
            && this.strikethrough == state.strikethrough)
        {
            return true;
        }
        return false;
    }
}

export class PostRenderer {
    constructor(context, content) {
        this.context = context;
        this.content = content;

        this.index = 0;
        this.stack = [new State()];
    }

    makeSpan(state) {
        const span = document.createElement("span");
        state.italic && span.classList.add("it");
        state.bold && span.classList.add("bd");
        state.strikethrough && span.classList.add("st");
        state.underline && span.classList.add("ul");
        return span;
    }

    pushState(state) {
        if (this.stack.length > 1) {
            if (this.stack[this.stack.length - 2].equal(state)) {
                return -1;
            }
        }
        this.stack.push(state);
        return 1;
    }

    getState() {
        return this.stack[this.stack.length - 1];
    }

    processChar(c) {
        if (c == "*") {
            if (this.getState().bold == true) {
                const state = new State(this.getState());
                state.bold = false;
                return this.pushState(state);
            }
            const state = new State(this.getState());
            state.bold = true;
            return this.pushState(state);
        } else if (c == "/") {
            if (this.getState().italic == true) {
                const state = new State(this.getState());
                state.italic = false;
                return this.pushState(state);
            }
            const state = new State(this.getState());
            state.italic = true;
            return this.pushState(state);
        } else if (c == "-") {
            if (this.getState().strikethrough == true) {
                const state = new State(this.getState());
                state.strikethrough = false;
                return this.pushState(state);
            }
            const state = new State(this.getState());
            state.strikethrough = true;
            return this.pushState(state);
        } else if (c == "_") {
            if (this.getState().underline == true) {
                const state = new State(this.getState());
                state.underline = false;
                return this.pushState(state);
            }
            const state = new State(this.getState());
            state.underline = true;
            return this.pushState(state);
        } else if (c == ">") {
            return 2;
        }
        return 0;
    }

    processLink() {
        if (this.content[this.index] != ">") {
            return;
        }
        const anchor = document.createElement("a");
        anchor.classList.add("postLink");

        let buffer = "";
        this.index++;
        for (; this.index < this.content.length;) {
            const c = this.content[this.index];

            if (c >= '0' && c <= '9') {
                buffer += c;
                this.index++;
                continue;
            }
            break;
        }

        anchor.innerText = ">>" + buffer;
        return anchor;
    }

    process() {
        const span = this.makeSpan(this.getState());

        let buffer = "";

        for (; this.index < this.content.length;) {
            const c = this.content[this.index];
            this.index++;
            if (!this.flag_broken) {
                if (c == "\\") {
                    this.flag_broken = true;
                    continue;
                }

                const r = this.processChar(c);
                if (r !== 0) {
                    if (buffer) {
                        span.appendChild(document.createTextNode(buffer));
                        buffer = "";
                    }
                    if (r === 1) {
                        span.appendChild(this.process());
                        continue;
                    } else if (r === -1) {
                        return span;
                    } else if (r === 2) {
                        const link = this.processLink();
                        if (link != null) {
                            span.appendChild(link);
                            continue;
                        }
                    }
                }
            }

            buffer += c;
            this.flag_broken = false;
        }

        if (buffer) {
            span.appendChild(document.createTextNode(buffer));
        }
        return span;
    }

    render()  {
        return this.process();
        const span = document.createElement("span");
        span.innerText = this.content;
        return span;
    }
}