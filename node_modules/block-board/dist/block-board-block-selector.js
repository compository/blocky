import { __decorate } from "tslib";
import { LitElement, html, property } from "lit-element";
import { sharedStyles } from "./sharedStyles";
export class BlockBoardBlockSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.availableBlocks = [];
    }
    onDragStart(e, block) {
        var _a;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("blockName", block.name);
    }
    render() {
        return html `
      <div class="column">
        ${this.availableBlocks.map((block) => html `<span
              draggable="true"
              @dragstart=${(e) => this.onDragStart(e, block)}
              >${block.name}
            </span>`)}
      </div>
    `;
    }
}
BlockBoardBlockSelector.styles = sharedStyles;
__decorate([
    property({ type: Array })
], BlockBoardBlockSelector.prototype, "availableBlocks", void 0);
//# sourceMappingURL=block-board-block-selector.js.map