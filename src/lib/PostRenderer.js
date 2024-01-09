export class PostRenderer {
    constructor(context, content) {
        this.context = context;
        this.content = content;

        this.index = 0;

        this.flag_italic = false;
        this.flag_bold = false;
        this.flag_strikethrough = false;
        this.flag_underline = false;
        this.flag_broken = true;
    }

    makeSpan() {
        const span = document.createElement("span");
        span.classList.add(
            this.flag_italic ? "it" : null,
            this.flag_bold ? "bd" : null,
            this.flag_strikethrough ? "st" : null,
            this.flag_underline ? "ul" : null,
        )
        return span;
    }

    processChar() {
        if (c == "*") {

        }
    }

    process() {
        const span = this.makeSpan();

        let buffer = "";

        for (; this.index < this.content.length; this.index++) {
            const c = this.content[this.index];
            if (!this.flag_broken) {
                if (c == "\\") {
                    this.flag_broken = true;
                    continue;
                }

                const r = processChar();
            }

            buffer += c;
            this.flag_broken = false;
        }

        return container;
    }

    render()  {
        const span = document.createElement("span");
        span.innerText = this.content;
        return span;
    }
}