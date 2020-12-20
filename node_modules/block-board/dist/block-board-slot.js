import { __decorate } from "tslib";
import { html, LitElement, property, query } from "lit-element";
export class BlockBoardSlot extends LitElement {
    firstUpdated() {
        this.block.render(this.shadowRoot);
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