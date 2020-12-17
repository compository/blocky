import { __decorate } from "tslib";
import { html, LitElement, property, query } from "lit-element";
import { Scoped } from "scoped-elements";
export class BlockBoardSlot extends Scoped(LitElement) {
    firstUpdated() {
        // If we have included the scoped-registries polyfill, we'll have the CustomElementRegistry on our shadow root
        const scopedRegistry = this.shadowRoot.customElements;
        // Otherwise we just use the global one
        const registry = scopedRegistry ? scopedRegistry : window.customElements;
        this.block.render(this.shadowRoot, registry);
    }
    render() {
        return html ``;
    }
}
__decorate([
    property({ type: Object })
], BlockBoardSlot.prototype, "block", void 0);
__decorate([
    query("#slot")
], BlockBoardSlot.prototype, "_slot", void 0);
//# sourceMappingURL=block-board-slot.js.map