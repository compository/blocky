import "scoped-registries";
export const scopeElement = (base) => {
    if (base.getStyles())
        return scopeLitElement(base);
    else
        return scopeHTMLElement(base);
};
const scopeHTMLElement = (base) => class extends base {
    constructor(...args) {
        super(...args);
        const elements = this.constructor
            .scopedElements;
        if (elements) {
            this.attachShadow({
                mode: "open",
                customElements: new CustomElementRegistry(),
            });
        }
    }
    connectedCallback() {
        if (super.connectedCallback) {
            super.connectedCallback();
        }
        const elements = this.constructor
            .scopedElements;
        for (const tag of Object.keys(elements)) {
            this.shadowRoot
                .customElements.define(tag, scopeElement(elements[tag]));
        }
    }
};
const scopeLitElement = (base) => class extends base {
    createRenderRoot() {
        const elements = this.constructor
            .scopedElements;
        if (elements) {
            return this.attachShadow({
                mode: "open",
                customElements: new CustomElementRegistry(),
            });
        }
        else
            return super.createRenderRoot();
    }
    connectedCallback() {
        super.connectedCallback();
        const elements = this.constructor
            .scopedElements;
        for (const tag of Object.keys(elements)) {
            this.shadowRoot
                .customElements.define(tag, scopeElement(elements[tag]));
        }
    }
};
//# sourceMappingURL=scoped.js.map