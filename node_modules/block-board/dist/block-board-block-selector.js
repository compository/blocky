import { __decorate } from "tslib";
import { LitElement, html, property } from "lit-element";
import { sharedStyles } from "./sharedStyles";
export class BlockBoardBlockSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.blockSets = [];
    }
    onDragStart(e, block) {
        var _a;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("blockName", block.name);
    }
    renderBlockSet(set) {
        return html `
      <div class="column" style="margin: 8px;">
        <span style="margin-bottom: 4px; font-weight: bold;">${set.name}</span>
        <div class="column" style="margin: 8px;">
          ${set.blocks.map((block) => html `<span
                style="margin-bottom: 4px;"
                draggable="true"
                @dragstart=${(e) => this.onDragStart(e, block)}
                >${block.name}
              </span>`)}
        </div>
      </div>
    `;
    }
    render() {
        return html `
      <div class="column">
        ${this.blockSets.map((set) => this.renderBlockSet(set))}
      </div>
    `;
    }
}
BlockBoardBlockSelector.styles = sharedStyles;
__decorate([
    property({ type: Array })
], BlockBoardBlockSelector.prototype, "blockSets", void 0);
//# sourceMappingURL=block-board-block-selector.js.map